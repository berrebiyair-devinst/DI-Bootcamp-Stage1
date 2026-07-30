function resolveAfter2Seconds() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('resolved');
        }, 2000);
    });
}

async function asyncCall() {
    console.log('calling'); 
    // First, "calling" is displayed immediately.

    let result = await resolveAfter2Seconds();
    // The function calls resolveAfter2Seconds() which returns a Promise.
    // The await keyword pauses the execution of asyncCall() until the Promise is resolved.
    // It waits for 2 seconds, but it does not block the entire JavaScript execution.

    console.log(result);
    // After 2 seconds, the Promise is resolved with the value "resolved".
    // The function resumes and displays "resolved".
}

asyncCall();
// Calling asyncCall() starts the execution of the async function.

// Output:
// calling
// (after 2 seconds)
// resolved