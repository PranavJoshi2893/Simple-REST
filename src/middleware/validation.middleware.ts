import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";

// Helper function to transform and validate data
const runValidation = async (dto: any, value: any) => {
  const object = plainToInstance(dto, value, { excludeExtraneousValues: true });
  const errors = await validate(object);
  if (errors.length > 0) {
    return errors;
  }
  return null;
};

// Main validation middleware function
const validateDTO = (dto: { body?: any; params?: any; query?: any }) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { body, params, query } = dto;
    let allErrors: { field: string; constraints: Record<string, string> | undefined }[] = [];

    // Validate request body
    if (body) {
      const errors = await runValidation(body, req.body);
      if (errors) {
        allErrors.push({ field: "body", constraints: flattenConstraints(errors) });
      } else {
        req.body = plainToInstance(body, req.body, { excludeExtraneousValues: true });
      }
    }

    // Validate request params
    if (params) {
      const errors = await runValidation(params, req.params);
      if (errors) {
        allErrors.push({ field: "params", constraints: flattenConstraints(errors) });
      } else {
        req.params = plainToInstance(params, req.params, { excludeExtraneousValues: true });
      }
    }

    // Validate request query
    if (query) {
      const errors = await runValidation(query, req.query);
      if (errors) {
        allErrors.push({ field: "query", constraints: flattenConstraints(errors) });
      } else {
        req.query = plainToInstance(query, req.query, { excludeExtraneousValues: true });
      }
    }

    // If there are validation errors, return a 400 response
    if (allErrors.length > 0) {
      return res.status(400).json({
        message: "Validation failed",
        errors: allErrors,
      });
    }

    next();
  };
};

// Helper function to flatten validation errors
const flattenConstraints = (errors: ValidationError[]) => {
  return errors.reduce((acc, err) => {
    if (err.constraints) {
      return { ...acc, ...err.constraints };
    }
    return acc;
  }, {});
};

export { validateDTO };
