/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { LoginRequest } from '../models/LoginRequest';
import type { UserCreate } from '../models/UserCreate';
import type { UserResponse } from '../models/UserResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AuthenticationService {
    /**
     * Register a new user
     * Create a new user account using name, email and password.
     * @param requestBody
     * @returns any User registered successfully
     * @throws ApiError
     */
    public static signupUser(
        requestBody: UserCreate,
    ): CancelablePromise<{
        status: boolean;
        message: string;
        user?: UserResponse;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/signup',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Validation error or duplicate email`,
            },
        });
    }
    /**
     * Login an existing user
     * @param requestBody
     * @returns any Login successful
     * @throws ApiError
     */
    public static postLogin(
        requestBody: LoginRequest,
    ): CancelablePromise<{
        status?: boolean;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                401: `Unauthorized`,
            },
        });
    }
}
