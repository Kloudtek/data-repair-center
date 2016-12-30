# data-repair-center

This applications is used for a human being to review messages that have been rejected by an asynchronous system where 
data loss isn't acceptable (typically in the case of message queues / JMS or batch).

It allows to browse and view data needing repair, and to perform various functions (delete, edit, resubmit)

It's UI is based on angularjs 2.0 (with primefaces).

The implementation is currently doing with mule but a pure java version will be implemented in the future