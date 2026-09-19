// Authentication & User State Management
const auth = {
    // Check if user is currently logged in
    isLoggedIn() {
        return !!localStorage.getItem('token');
    },

    // Get current user object
    getUser() {
        const userJson = localStorage.getItem('user');
        return userJson ? JSON.parse(userJson) : null;
    },

    // Get auth token
    getToken() {
        return localStorage.getItem('token');
    },

    // Check if user has Admin role
    isAdmin() {
        const user = this.getUser();
        return user && user.role === 'Admin';
    },

    // Save login session
    saveSession(token, user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    },

    // Clear session & logout
    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.reload();
    },

    // Update Navbar according to login status
    renderNavAuth() {
        const authContainer = document.getElementById('navAuthContainer');
        if (!authContainer) return;

        if (this.isLoggedIn()) {
            const user = this.getUser();
            const adminLink = this.isAdmin() ? `
                <li><a class="dropdown-item text-warning" href="admin/dashboard.html"><i class="bi bi-shield-lock me-2"></i>Admin Panel</a></li>
                <li><hr class="dropdown-divider bg-secondary"></li>
            ` : '';

            authContainer.innerHTML = `
                <div class="dropdown">
                    <button class="btn btn-outline-gold dropdown-toggle d-flex align-items-center gap-2" type="button" data-bs-toggle="dropdown">
                        <i class="bi bi-person-circle fs-5"></i>
                        <span>${user.fullName || 'My Account'}</span>
                        ${this.isAdmin() ? '<span class="badge bg-warning text-dark ms-1">Admin</span>' : ''}
                    </button>
                    <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end shadow">
                        <li class="dropdown-header text-uppercase text-secondary small">Signed in as</li>
                        <li class="px-3 text-white fw-bold text-truncate" style="max-width: 200px;">${user.email}</li>
                        <li><hr class="dropdown-divider bg-secondary"></li>
                        ${adminLink}
                        <li><a class="dropdown-item" href="profile.html"><i class="bi bi-person me-2"></i>My Profile & Favorites</a></li>
                        <li><a class="dropdown-item" href="quiz.html"><i class="bi bi-trophy me-2"></i>My Quiz Scores</a></li>
                        <li><hr class="dropdown-divider bg-secondary"></li>
                        <li><a class="dropdown-item text-danger" href="javascript:void(0)" onclick="auth.logout()"><i class="bi bi-box-arrow-right me-2"></i>Logout</a></li>
                    </ul>
                </div>
            `;
        } else {
            authContainer.innerHTML = `
                <div class="d-flex gap-2">
                    <a href="login.html" class="btn btn-outline-gold btn-sm px-3">Login</a>
                    <a href="register.html" class="btn btn-gold btn-sm px-3">Register</a>
                </div>
            `;
        }
    }
};

// Auto-run when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    auth.renderNavAuth();
});
