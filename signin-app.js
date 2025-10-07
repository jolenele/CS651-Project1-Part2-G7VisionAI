const { useState } = React;

// Login Form Component
function LoginForm({ onLogin, onCreateAccount, loginData, setLoginData }) {
    const [formData, setFormData] = useState({
        username: loginData.username || '',
        password: loginData.password || ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoginData(formData);
        onLogin(formData);
    };

    return (
        <div className="signin-form-container">
            <div className="text-center mb-4">
                <h2 className="fw-bold">Sign In</h2>
                <p className="text-muted">Enter your credentials to access your account</p>
            </div>
            
            <form onSubmit={handleSubmit} className="signin-form">
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        <i className="fas fa-user me-2"></i>Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your username"
                    />
                </div>
                
                <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                        <i className="fas fa-lock me-2"></i>Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your password"
                    />
                </div>
                
                <div className="d-grid gap-2 mb-3">
                    <button type="submit" className="btn btn-primary btn-lg">
                        <i className="fas fa-sign-in-alt me-2"></i>Sign In
                    </button>
                </div>
                
                <div className="text-center">
                    <button 
                        type="button" 
                        className="btn btn-outline-primary"
                        onClick={onCreateAccount}
                    >
                        <i className="fas fa-user-plus me-2"></i>Create Account
                    </button>
                </div>
            </form>
        </div>
    );
}

// Create Account Form Component
function CreateAccountForm({ onCreateAccount, onCancel, setLoginData }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        username: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        setLoginData({
            username: formData.username,
            password: formData.password
        });
        
        alert(`Account created successfully for ${formData.name}! You can now sign in with your new credentials.`);
        
        onCreateAccount();
    };

    return (
        <div className="create-account-form-container">
            <div className="text-center mb-4">
                <h2 className="fw-bold">Create Account</h2>
                <p className="text-muted">Fill in your details to create a new account</p>
            </div>
            
            <form onSubmit={handleSubmit} className="create-account-form">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                        <i className="fas fa-id-card me-2"></i>Full Name
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your full name"
                    />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        <i className="fas fa-envelope me-2"></i>Email Address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter your email"
                    />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        <i className="fas fa-user me-2"></i>Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                        placeholder="Choose a username"
                    />
                </div>
                
                <div className="mb-4">
                    <label htmlFor="password" className="form-label">
                        <i className="fas fa-lock me-2"></i>Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        placeholder="Create a password"
                    />
                </div>
                
                <div className="d-grid gap-2 mb-3">
                    <button type="submit" className="btn btn-success btn-lg">
                        <i className="fas fa-check me-2"></i>Create Account
                    </button>
                </div>
                
                <div className="text-center">
                    <button 
                        type="button" 
                        className="btn btn-outline-secondary"
                        onClick={onCancel}
                    >
                        <i className="fas fa-arrow-left me-2"></i>Back to Sign In
                    </button>
                </div>
            </form>
        </div>
    );
}

function SignInApp() {
    const [showCreateAccount, setShowCreateAccount] = useState(false);
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const handleLogin = (formData) => {
        // Simulate login process
        console.log('Login attempt:', formData);
        alert(`Welcome back, ${formData.username}! Login successful.`);
    };

    const handleCreateAccount = () => {
        setShowCreateAccount(!showCreateAccount);
    };

    const handleCancelCreateAccount = () => {
        setShowCreateAccount(false);
    };

    return (
        <div className="signin-app">
            {!showCreateAccount ? (
                <LoginForm 
                    onLogin={handleLogin}
                    onCreateAccount={handleCreateAccount}
                    loginData={loginData}
                    setLoginData={setLoginData}
                />
            ) : (
                <CreateAccountForm 
                    onCreateAccount={handleCreateAccount}
                    onCancel={handleCancelCreateAccount}
                    setLoginData={setLoginData}
                />
            )}
        </div>
    );
}

ReactDOM.render(<SignInApp />, document.getElementById('signin-app'));
