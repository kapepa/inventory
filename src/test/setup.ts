import '@testing-library/jest-dom'
import { TextEncoder, TextDecoder } from 'util'

// Polyfill для TextEncoder/TextDecoder в Node.js окружении
global.TextEncoder = TextEncoder
global.TextDecoder = TextDecoder as typeof global.TextDecoder