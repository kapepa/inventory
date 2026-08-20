import { describe, it, expect } from 'vitest'
import { ERROR_CODES } from '@/shared/constants/error-codes'
import {
  AlreadyExistsError,
  NotFoundError,
  HasDependenciesError,
  ForbiddenError,
  InvalidCredentialsError,
  InvalidInputError,
  NotVerifiedError,
  ExpiredError,
  EmailSendError,
} from '../errors-server'

describe('Server Errors', () => {
  describe('AlreadyExistsError', () => {
    it('creates error with correct properties', () => {
      const error = new AlreadyExistsError('User')

      expect(error.name).toBe('AlreadyExistsError')
      expect(error.message).toBe('User already exists')
      expect(error.code).toBe(ERROR_CODES.ALREADY_EXISTS)
      expect(error.entity).toBe('User')
    })

    it('is instance of Error', () => {
      const error = new AlreadyExistsError('Product')
      expect(error).toBeInstanceOf(Error)
    })
  })

  describe('NotFoundError', () => {
    it('creates error with correct properties', () => {
      const error = new NotFoundError('Product')

      expect(error.name).toBe('NotFoundError')
      expect(error.message).toBe('Product not found')
      expect(error.code).toBe(ERROR_CODES.NOT_FOUND)
      expect(error.entity).toBe('Product')
    })
  })

  describe('HasDependenciesError', () => {
    it('creates error with correct properties', () => {
      const error = new HasDependenciesError('Category')

      expect(error.name).toBe('HasDependenciesError')
      expect(error.message).toBe('Category has dependencies')
      expect(error.code).toBe(ERROR_CODES.HAS_DEPENDENCIES)
      expect(error.entity).toBe('Category')
    })
  })

  describe('ForbiddenError', () => {
    it('creates error with correct properties', () => {
      const error = new ForbiddenError('Access denied')

      expect(error.name).toBe('ForbiddenError')
      expect(error.message).toBe('Access denied')
      expect(error.code).toBe(ERROR_CODES.FORBIDDEN)
    })

    it('accepts custom message', () => {
      const error = new ForbiddenError('You do not have permission')
      expect(error.message).toBe('You do not have permission')
    })
  })

  describe('InvalidCredentialsError', () => {
    it('creates error with correct properties', () => {
      const error = new InvalidCredentialsError()

      expect(error.name).toBe('InvalidCredentialsError')
      expect(error.message).toBe('Invalid credentials')
      expect(error.code).toBe(ERROR_CODES.INVALID_CREDENTIALS)
    })
  })

  describe('InvalidInputError', () => {
    it('creates error with correct properties', () => {
      const error = new InvalidInputError('Email is required')

      expect(error.name).toBe('InvalidInputError')
      expect(error.message).toBe('Email is required')
      expect(error.code).toBe(ERROR_CODES.INVALID_INPUT)
    })
  })

  describe('NotVerifiedError', () => {
    it('creates error with correct properties', () => {
      const error = new NotVerifiedError()

      expect(error.name).toBe('NotVerifiedError')
      expect(error.message).toBe('Email not verified')
      expect(error.code).toBe(ERROR_CODES.NOT_VERIFIED)
    })
  })

  describe('ExpiredError', () => {
    it('creates error with correct properties', () => {
      const error = new ExpiredError('Token')

      expect(error.name).toBe('ExpiredError')
      expect(error.message).toBe('Token expired')
      expect(error.code).toBe(ERROR_CODES.EXPIRED)
      expect(error.entity).toBe('Token')
    })

    it('includes email when provided', () => {
      const error = new ExpiredError('Verification', 'test@example.com')

      expect(error.entity).toBe('Verification')
      expect(error.email).toBe('test@example.com')
    })

    it('has undefined email when not provided', () => {
      const error = new ExpiredError('Session')
      expect(error.email).toBeUndefined()
    })
  })

  describe('EmailSendError', () => {
    it('creates error with default message', () => {
      const error = new EmailSendError()

      expect(error.name).toBe('EmailSendError')
      expect(error.message).toBe('Failed to send email')
      expect(error.code).toBe(ERROR_CODES.EMAIL_SEND_FAILED)
    })

    it('creates error with custom message', () => {
      const error = new EmailSendError('SMTP connection failed')
      expect(error.message).toBe('SMTP connection failed')
    })
  })
})