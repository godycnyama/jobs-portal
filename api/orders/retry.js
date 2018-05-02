function updatePaymentStatus(cb) {
    var operation = retry.operation({
        forever: true,
        factor: 3,
        minTimeout: 1 * 1000,
        maxTimeout: 60 * 1000,
        randomize: true,
    });

    operation.attempt(function (currentAttempt) {
        order.save(function (err, order0) {
            if (operation.retry(err)) {
                return;
            }

            cb(err ? operation.mainError() : null, order0);
        });
    });
}

updatePaymentStatus(function (err, order1) {
    if (err) {
        throw err;
    }
    // notifier.emit("paid", order1);
});