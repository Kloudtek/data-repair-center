# data-repair-center

This applications is used for a human being to review messages that have been rejected by an asynchronous system where 
data loss isn't acceptable (typically in the case of message queues / JMS or batch).

It allows to browse and view data needing repair, and to perform various functions (delete, edit, resubmit)

It's UI is based on angularjs 2.0 (with primefaces).

The implementation is currently doing with mule but a pure java version will be implemented in the future

## Running example mule backend

In order to build and run the example mule application, you will need to have installed:

- [vagrant](https://www.vagrantup.com/) (and we recommend you install [vagrant-cachier](https://github.com/fgrehm/vagrant-cachier) as well, but it's not mandatory). 
- [npm](https://www.npmjs.com/)
- [maven](https://maven.apache.org/)

Once you have those installed, you will need first to build and deploy all the projects using maven (in the root folder of the project):

```
mvn install
```

Once that's done all dependencies will be installed on your local maven repository

After that you will need to start the vagrant virtual machine, which just requires you to run:

```
vagrant up
```

The mule project can then be run normally through your preferred method (typically anypoint studio).

In order to test the application, send some json test data (using POST) to [http://localhost:8081/test](http://localhost:8081/test), for example using curl:

```
curl -X POST -H "Content-Type: application/json" --data-binary '{"valid":"false"}' http://localhost:8081/test
```

You will see the message being send to Activemq and fail 3 times (because 'valid' isn't set to true).

After that access the UI at [http://localhost:8081/ui/](http://localhost:8081/ui/).

You see the data you just sent, you should then edit it so that it it contains ```{"valid":"true"}```, and resubmit it (at this point it should be accepted)
