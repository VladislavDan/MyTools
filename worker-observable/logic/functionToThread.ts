export const functionToThread = <A, R>(workerFunction: (arg: A) => R) => {

    const functionString = `(function worker() {
            var self = this;
            self.onmessage = function(e) {
                const result = (${workerFunction.toString()})(e.data)
                self.postMessage(result);
            }
        })()`;

    const functionBlob = new Blob([functionString], {type: 'text/javascript'});

    return new Worker(URL.createObjectURL(functionBlob));
}
