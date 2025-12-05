function Nav() {
  const { isAuthenticated, logout, user, isAdmin } = useAuth();
  const { cartCount } = useCart();

  const [hideOnScroll, setHideOnScroll] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // ✅ estado del menú mobile

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.innerWidth < 768) {
        if (window.scrollY > lastScrollY) {
          setHideOnScroll(true); // bajando → se oculta
        } else {
          setHideOnScroll(false); // subiendo → aparece
        }
        lastScrollY = window.scrollY;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark bg-dark sticky-top ${
        hideOnScroll ? "hide-navbar" : ""
      }`}
    >
      <div className="container">
        <Link className="navbar-brand fw-bold text-uppercase" to="/">
          eCommerce
        </Link>

        {/* ✅ BOTÓN HAMBURGUESA REAL */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ✅ MENÚ COLAPSABLE REAL */}
        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item" onClick={() => setIsOpen(false)}>
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>

            {isAuthenticated && (
              <li className="nav-item" onClick={() => setIsOpen(false)}>
                <NavLink className="nav-link" to="/cart">
                  Carrito ({cartCount})
                </NavLink>
              </li>
            )}
          </ul>

          <div className="d-flex gap-2 align-items-center">
            {isAdmin && (
              <NavLink
                to="/admin"
                className="btn btn-outline-light btn-sm"
                onClick={() => setIsOpen(false)}
              >
                Admin
              </NavLink>
            )}

            {isAuthenticated ? (
              <>
                <span className="text-light small">
                  {isAdmin ? "Bienvenido Admin" : user.email}
                </span>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="btn btn-primary btn-sm"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
