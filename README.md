# About SIGIO
SIGIO (Sistema Integrado de Gestão de Informação Ortoprotesica) is an open-source project designed to manage and streamline information workflows within orthopedic centers. This system helps healthcare providers efficiently manage patient records, prosthetic orders, and inventory while providing robust reporting tools.

SIGIO aims to improve the overall management of orthopedic information systems by providing:

Intuitive user interfaces for managing patient and clinic data.
Seamless integration with inventory management systems.
Comprehensive reporting and analytics features.
Secure access control and data management.

## Key Features
- Patient Management: Easily manage patient records, appointments, and treatment plans.
- Inventory Tracking: Keep track of prosthetic components and supplies with detailed stock management.
- Report Generation: Generate detailed reports for performance analysis and decision-making.
- Role-Based Access Control: Ensure secure access to sensitive data by assigning specific roles to different user types.

## Getting Started
### Prerequisites
Before installing SIGIO, ensure you have the following installed:

- PHP >= 8.x
- Composer
- Laravel Framework
- PostgreSQL

### Installation
Clone the repository:

```bash
git clone https://github.com/nelio-bila/sigio.git
cd sigio
```

Install dependencies:
```bash
composer install
```

Setup environment variables:
```bash
cp .env.example .env
php artisan key:generate
```

Run migrations:
```bash
php artisan migrate
```

Start the development server:
```bash
php artisan serve
```

Visit http://localhost:8000 in your browser to start using SIGIO.

## Documentation
Comprehensive documentation is available to help you get the most out of SIGIO. Please visit the Documentation for more details.

## Contributing
We welcome contributions to SIGIO! Please read our Contribution Guide to get started.

## Code of Conduct
We aim to maintain a welcoming and inclusive community. Please adhere to our Code of Conduct while contributing.

## Security Vulnerabilities
If you discover a security vulnerability within SIGIO, please send an e-mail to nelio.bila@hcm.gov.mz We take security seriously and will address any issues promptly.

License
SIGIO is open-sourced software licensed under the MIT license.
