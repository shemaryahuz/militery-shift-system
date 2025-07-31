# Server-Side Application

This repository contains the server-side application code for a NestJS-based API.

## Architecture

The application is built using the NestJS framework and follows a modular architecture. The main modules are:

* **Users Module**: Handles user authentication and management.
* **Shifts Module**: Handles shift management for users.
* **Assignments Module**: Handles assignment management for users.

Each module has its own set of controllers, services, and entities.

## File Structure

The repository is organized into the following directories:

* **src**: Contains the application code.
	+ **app.module.ts**: The main application module.
	+ **app.controller.ts**: The main application controller.
	+ **app.service.ts**: The main application service.
	+ **users**: The users module directory.
		- **users.module.ts**: The users module.
		- **users.controller.ts**: The users controller.
		- **users.service.ts**: The users service.
		- **users.entity.ts**: The users entity.
	+ **shifts**: The shifts module directory.
		- **shifts.module.ts**: The shifts module.
		- **shifts.controller.ts**: The shifts controller.
		- **shifts.service.ts**: The shifts service.
		- **shifts.entity.ts**: The shifts entity.
	+ **assignments**: The assignments module directory.
		- **assignments.module.ts**: The assignments module.
		- **assignments.controller.ts**: The assignments controller.
		- **assignments.service.ts**: The assignments service.
		- **assignments.entity.ts**: The assignments entity.

## Features

The application has the following features:

* User authentication and management.
* Shift management for users.
* Assignment management for users.

## Author

This application was built by [Shemaryahu Zalmanov](https://github.com/shemaryahuz).

## License

This application is licensed under the MIT License.

## Contributing

Contributions are welcome! Please submit a pull request with your changes.