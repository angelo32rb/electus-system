# ⚡ Electus System v1 - Centralized E-commerce Integration Platform

<p align="center">
  <img src="frontend/src/assets/img/star_logo_electus.png" alt="Electus Logo" width="200"/>
</p>

<p align="center">
  <strong>A unified API gateway for multi-platform e-commerce data management</strong><br>
  <em>Version 1.0 - Centralized Integration System</em>
</p>

<div align="center">

[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-19.1-61dafb?logo=react)](https://reactjs.org/)
[![MySQL](https://img.shields.io/badge/MySQL-Database-4479a1?logo=mysql)](https://mysql.com/)
[![API](https://img.shields.io/badge/REST-API-25D366?logo=api)](https://restfulapi.net/)
[![Integration](https://img.shields.io/badge/Multi--Platform-Integration-FF6B6B)](https://github.com)

</div>

---

## 🌟 Overview

**Electus System** is a powerful v1 centralized integration platform that enables users to seamlessly connect their e-commerce accounts from multiple platforms or create custom data tables. The system provides a unified API layer that aggregates data from various sources, making it accessible through a single, consistent interface.

### 🎯 Core Purpose

The platform serves as a **centralized data hub** where users can:
- **Link existing e-commerce accounts** (Odoo, WooCommerce, Shopify)
- **Create custom spreadsheets** for unique business requirements
- **Access all data through a unified REST API** for streamlined integration
- **Manage inventory and orders** across multiple platforms from one dashboard

## 🏗️ Architecture

### System Components

#### 🔧 **Backend API** (`backend/`)
- **Framework**: Node.js with Express 5.1.0
- **Database**: MySQL 2 with connection pooling
- **Authentication**: JWT-based token system with role-based access
- **Encryption**: AES encryption for API keys and sensitive data
- **Email**: Nodemailer for authentication and notifications
- **Logging**: Winston for comprehensive error tracking

#### 🎨 **Frontend Dashboard** (`frontend/`)
- **Framework**: React 19.1 with modern hooks
- **Build Tool**: Vite 6.3.5 for fast development
- **Routing**: React Router DOM 7.6.1
- **UI Components**: Custom component library
- **Data Tables**: React Data Table Component for spreadsheet display
- **Notifications**: SweetAlert2 for user feedback

#### 🗄️ **Database Schema**
```sql
Core Tables:
├── users (User accounts with platform associations)
├── platforms (Supported platforms: ElectusInventory, WooCommerce, etc.)
├── spreadsheets (User-created data tables)
├── api_keys (Encrypted API keys for external integrations)
├── columns_sheet (Dynamic column definitions)
├── rows_sheet (Data row containers)
└── cells_sheet (Individual data cells)
```

## 🔌 Platform Integrations

### Supported E-commerce Platforms

#### 🟢 **Currently Supported**
- **ElectusInventory**: Native platform integration
- **WooCommerce**: WordPress e-commerce integration
- **Custom Tables**: User-defined data structures

#### 🟡 **Planned Integrations** (Future Versions)
- **Shopify**: Full Shopify store integration
- **Odoo**: Enterprise ERP system connection
- **Magento**: Adobe Commerce platform
- **BigCommerce**: Cloud e-commerce solution

## 🚀 Key Features

### 📊 **Dynamic Spreadsheet System**
- **Custom Table Creation**: Users can create their own data structures
- **Flexible Schema**: Dynamic column creation and management
- **Data Types**: Support for various data types (text, numbers, JSON)
- **Real-time Updates**: Live data synchronization across platforms

### 🔑 **API Key Management**
- **Secure Generation**: AES-encrypted API key generation
- **Platform Association**: Keys linked to specific e-commerce platforms
- **Access Control**: Role-based permissions (admin, client)
- **Token Rotation**: Secure token refresh mechanisms

### 🛡️ **Security Features**
- **Encryption**: AES encryption for sensitive data
- **Authentication**: JWT-based authentication system
- **Authorization**: Granular permission controls
- **Password Security**: Secure password hashing and reset
- **Email Verification**: Multi-step authentication process

### 📈 **Data Management**
- **Centralized Storage**: All platform data in one location
- **Unified API**: Single API endpoint for multiple platforms
- **Data Normalization**: Consistent data format across sources
- **Export Capabilities**: Data export in multiple formats

## 🛠️ Tech Stack

### Backend Technologies
- **Node.js 18+**: JavaScript runtime environment
- **Express 5.1**: Web application framework
- **MySQL2 3.14**: Database driver with async support
- **Winston 3.17**: Comprehensive logging system
- **Crypto-JS 4.2**: Data encryption and hashing
- **Nodemailer 7.0**: Email service integration
- **Dotenv 17.2**: Environment configuration
- **CORS 2.8**: Cross-origin resource sharing

### Frontend Technologies
- **React 19.1**: Modern React with concurrent features
- **Vite 6.3**: Next-generation frontend tooling
- **React Router DOM 7.6**: Declarative routing
- **Axios 1.9**: HTTP client for API communication
- **React Data Table**: Advanced data grid component
- **React Icons 5.5**: Comprehensive icon library
- **SweetAlert2 11.22**: Beautiful alert dialogs

### Development Tools
- **ESLint 9.25**: Code linting and style enforcement
- **Nodemon 3.1**: Development server with auto-restart
- **Vite Plugin React SWC**: Fast React refresh
- **TypeScript Support**: Type definitions for enhanced development

## 🗂️ Project Structure

```
electus-system/
├── backend/                          # Node.js API Server
│   ├── Config/                       # Database configuration
│   ├── Controllers/                  # Request handlers
│   │   ├── Admin.controller.js       # Admin operations
│   │   ├── API.controller.js         # API endpoints
│   │   ├── Client.controller.js      # Client operations
│   │   └── Public.controller.js      # Public endpoints
│   ├── Middlewares/                  # Request middlewares
│   │   ├── Auth.middleware.js        # Authentication
│   │   ├── API.middleware.js         # API key validation
│   │   ├── Permission.middleware.js  # Authorization
│   │   ├── Platform.middleware.js    # Platform validation
│   │   └── Role.middleware.js        # Role-based access
│   ├── Models/                       # Data access layer
│   │   ├── APIKeys.model.js          # API key management
│   │   ├── ElectusInventory.model.js # Spreadsheet operations
│   │   ├── Platforms.model.js        # Platform management
│   │   ├── Ranks.model.js           # User roles
│   │   └── Users.model.js           # User management
│   ├── Routes/                       # API route definitions
│   ├── Utils/                        # Utility functions
│   │   ├── CryptoUtils.js           # Encryption helpers
│   │   ├── DebugLogger.js           # Logging utilities
│   │   ├── PasswordGenerator.js      # Secure password generation
│   │   └── email/                   # Email templates
│   └── app.js                       # Express application
│
├── frontend/                         # React Dashboard
│   ├── src/
│   │   ├── Components/               # Reusable components
│   │   │   ├── Auth/                # Authentication forms
│   │   │   ├── Dashboard/           # Dashboard components
│   │   │   │   ├── DataTables/      # Data grid components
│   │   │   │   ├── Instances/       # Instance management
│   │   │   │   ├── Menus/           # Navigation components
│   │   │   │   └── Spreadsheets/    # Spreadsheet management
│   │   │   └── AppLoader/           # Application loader
│   │   ├── Contexts/                # React contexts
│   │   ├── Hooks/                   # Custom React hooks
│   │   ├── lib/                     # UI component library
│   │   ├── Pages/                   # Page components
│   │   ├── Router/                  # Routing configuration
│   │   └── Services/                # API communication
│   └── public/                      # Static assets
```

## 🚦 Getting Started

### Prerequisites
- **Node.js** (v18 or higher)
- **MySQL** (v8.0 or higher)
- **npm** or **yarn** package manager
- **Modern web browser** for dashboard access

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd electus-system
   ```


2. **Backend Configuration**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env with your database credentials
   ```

   **Environment Variables** (`.env`):
   ```env
   EXPRESS_PORT=3000
   EXPRESS_HOST=localhost
   
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=electusdb
   
   JWT_SECRET=your_jwt_secret
   ENCRYPTION_KEY=your_32_character_key
   
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_app_password
   ```

3. **Install backend dependencies**
   ```bash
   npm install
   npm start
   ```

4. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   npm run dev
   ```

5. **Access the application**
   - **Frontend Dashboard**: `http://localhost:5173`
   - **Backend API**: `http://localhost:3000`
   - **API Documentation**: `http://localhost:3000/api/v1`

## 🔐 API Authentication

The system uses a multi-layered authentication approach:

### User Authentication
```javascript
// Login endpoint
POST /api/v1/login
{
  "username": "user@example.com",
  "password": "secure_password"
}

// Response
{
  "status": true,
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "username": "user@example.com",
    "platform": "ElectusInventory"
  }
}
```

### API Key Authentication
```javascript
// For external API access
GET /rest-api/v1/data
Headers: {
  "X-API-Key": "encrypted_api_key_here"
}
```

## 📊 Usage Examples

### Creating a Custom Spreadsheet

1. **User Registration and Platform Selection**
   ```javascript
   POST /api/v1/register
   {
     "username": "merchant@store.com",
     "password": "secure_password",
     "email": "merchant@store.com",
     "shop_name": "My Online Store",
     "platform": "ElectusInventory"
   }
   ```

2. **Create Normal Spreadsheet**
   ```javascript
   POST /api/v1/clients/create-normal-spreadsheet
   Headers: { "Authorization": "Bearer jwt_token" }
   {
     "sheetName": "Product Inventory"
   }
   ```

3. **Add Custom Columns**
   ```javascript
   POST /api/v1/clients/create-normal-spreadsheet-columns
   {
     "columns": ["Product Name", "SKU", "Price", "Stock", "Category"]
   }
   ```

4. **Insert Data**
   ```javascript
   POST /api/v1/clients/add-normal-spreadsheet-data
   {
     "data": {
       "Product Name": "Gaming Laptop",
       "SKU": "GL-001",
       "Price": "1299.99",
       "Stock": "15",
       "Category": "Electronics"
     }
   }
   ```

### External API Access

```javascript
// Get spreadsheet data via API key
GET /rest-api/v1/spreadsheet/normal
Headers: {
  "X-API-Key": "your_encrypted_api_key"
}

// Response
{
  "status": true,
  "data": [
    {
      "Product Name": "Gaming Laptop",
      "SKU": "GL-001",
      "Price": "1299.99",
      "Stock": "15",
      "Category": "Electronics"
    }
  ]
}
```

## 🔄 Integration Workflow

### Step 1: Platform Connection
Users choose their integration type:
- **Existing Platform**: Link Odoo, WooCommerce, or Shopify account
- **Custom Solution**: Create custom spreadsheets and data structures

### Step 2: Data Synchronization
- **Automatic Sync**: Real-time data synchronization from connected platforms
- **Manual Import**: CSV/JSON data import capabilities
- **API Integration**: RESTful endpoints for external system integration

### Step 3: Unified Access
- **Single Dashboard**: Manage all platform data from one interface
- **Centralized API**: Access all data through unified endpoints
- **Export Options**: Download data in various formats

## 🛡️ Security Considerations

### Data Protection
- **Encryption at Rest**: All sensitive data encrypted using AES
- **Secure Transmission**: HTTPS for all API communications
- **API Key Rotation**: Regular key rotation mechanisms
- **Access Logging**: Comprehensive audit trail

### Authentication Security
- **Password Hashing**: Secure password storage with salting
- **JWT Tokens**: Stateless authentication with expiration
- **Role-based Access**: Granular permission system
- **Email Verification**: Multi-factor authentication support

## 🚀 Future Roadmap

### Version 1.1 (Planned)
- **Shopify Integration**: Complete Shopify API integration
- **Odoo Connector**: ERP system integration
- **Bulk Operations**: Mass data import/export features
- **Webhook Support**: Real-time data synchronization

### Version 1.2 (Planned)
- **Analytics Dashboard**: Business intelligence features
- **Data Visualization**: Charts and graphs for insights
- **Mobile App**: iOS and Android applications
- **Advanced Filtering**: Complex query capabilities

### Version 2.0 (Future)
- **AI Integration**: Machine learning for data insights
- **Multi-tenant Architecture**: Enterprise-grade scaling
- **GraphQL API**: Advanced query capabilities
- **Microservices**: Distributed system architecture

## 🤝 Contributing

This is a v1 system with room for improvements:

### Areas for Enhancement
1. **Integration Expansion**: Add more e-commerce platforms
2. **Performance Optimization**: Database query optimization
3. **UI/UX Improvements**: Enhanced user interface design
4. **Error Handling**: More robust error management
5. **Testing Coverage**: Comprehensive test suite
6. **Documentation**: API documentation with OpenAPI

### Development Guidelines
- Follow RESTful API design principles
- Use consistent error response formats
- Implement proper input validation
- Add comprehensive logging
- Write unit tests for new features

## 📞 Support

For questions about the Electus System v1:
- **System Architecture**: Review the codebase structure
- **API Integration**: Check the Controllers and Models
- **Database Schema**: Reference the backup SQL file
- **Frontend Components**: Explore the React component library

## 📄 License

This is a Version 1 development system. License terms to be determined for production release.

---

<div align="center">

**🌟 Electus System v1 - Unifying E-commerce Data Management**

*"One API to rule them all"*

**Built for scalability • Designed for integration • Optimized for performance**

</div>
