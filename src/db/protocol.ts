export interface DB {
    connectDB(): Promise<void>
}