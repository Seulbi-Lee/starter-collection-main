declare const waitForUserInput: (question?: string) => Promise<string>;
declare const waitForKeyPress: (question?: string) => Promise<{
    name: string;
    ctrl: boolean;
}>;

export { waitForKeyPress, waitForUserInput };
