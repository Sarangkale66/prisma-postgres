/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UserResponse } from '../models/UserResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class UsersService {
    /**
     * Fetch a user by ID
     * @param id User ID
     * @returns any User fetched successfully
     * @throws ApiError
     */
    public static getMe(
        id: string,
    ): CancelablePromise<{
        message?: string;
        user?: Array<UserResponse>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/me/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `User ID missing`,
            },
        });
    }
}
