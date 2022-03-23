import { NavLink } from 'react-router-dom';

const Sidebar = () => {
    return (
        <>
            <div className="loader-bg">
                <div className="loader-track">
                    <div className="loader-fill"></div>
                </div>
            </div>

            <nav className="pcoded-navbar">
                <div className="navbar-wrapper">
                    <div className="navbar-brand header-logo">
                        <NavLink to="/" className="b-brand">
                            <div className="b-bg">
                                <i className="feather icon-trending-up"></i>
                            </div>
                            <span className="b-title">AutoPaint</span>
                        </NavLink>
                        <a className="mobile-menu" id="mobile-collapse" href="javascript:"><span></span></a>
                    </div>
                    <div className="navbar-content scroll-div">
                        <ul className="nav pcoded-inner-navbar">
                            <li className="nav-item pcoded-menu-caption">
                                <label>Navigation</label>
                            </li>
                            <li data-username="dashboard Default Ecommerce CRM Analytics Crypto Project" className="nav-item active">
                                <NavLink to="/" className="nav-link "><span className="pcoded-micon"><i className="feather icon-home"></i></span><span className="pcoded-mtext">Dashboard</span></NavLink>
                            </li>
                            <li className="nav-item pcoded-menu-caption">
                                <label>UI Element</label>
                            </li>
                            <li data-username="basic components Button Alert Badges breadcrumb Paggination progress Tooltip popovers Carousel Cards Collapse Tabs pills Modal Grid System Typography Extra Shadows Embeds" className="nav-item pcoded-hasmenu">
                                <a href="javascript:" className="nav-link "><span className="pcoded-micon"><i className="feather icon-box"></i></span><span className="pcoded-mtext">Components</span></a>
                                <ul className="pcoded-submenu">
                                    <li className=""><a href="bc_button.html" className="">Button</a></li>
                                    <li className=""><a href="bc_badges.html" className="">Badges</a></li>
                                    <li className=""><a href="bc_breadcrumb-pagination.html" className="">Breadcrumb & paggination</a></li>
                                    <li className=""><a href="bc_collapse.html" className="">Collapse</a></li>
                                    <li className=""><a href="bc_tabs.html" className="">Tabs & pills</a></li>
                                    <li className=""><a href="bc_typography.html" className="">Typography</a></li>


                                    <li className=""><a href="icon-feather.html" className="">Feather<span className="pcoded-badge label label-danger">NEW</span></a></li>
                                </ul>
                            </li>
                            <li className="nav-item pcoded-menu-caption">
                                <label>Forms & table</label>
                            </li>
                            <li data-username="form elements advance componant validation masking wizard picker select" className="nav-item">
                                <NavLink to="/clientes" className="nav-link "><span className="pcoded-micon"><i className="feather icon-user-plus"></i></span><span className="pcoded-mtext">Agregar Cliente</span></NavLink>
                            </li>
                            <li data-username="form elements advance componant validation masking wizard picker select" className="nav-item">
                                <NavLink to="/coche" className="nav-link "><span className="pcoded-micon"><i className="feather icon-plus"></i></span><span className="pcoded-mtext">Agregar Coche</span></NavLink>
                            </li>
                            <li data-username="form elements advance componant validation masking wizard picker select" className="nav-item">
                                <NavLink to="/piesa" className="nav-link "><span className="pcoded-micon"><i className="feather icon-plus"></i></span><span className="pcoded-mtext">Agregar Piesa</span></NavLink>
                            </li>
                            <li data-username="form elements advance componant validation masking wizard picker select" className="nav-item">
                                <NavLink to="/empleados" className="nav-link "><span className="pcoded-micon"><i className="feather icon-user-plus"></i></span><span className="pcoded-mtext">Agregar Empleados</span></NavLink>
                            </li>
                            <li data-username="form elements advance componant validation masking wizard picker select" className="nav-item">
                                <NavLink to="form_elements.html" className="nav-link "><span className="pcoded-micon"><i className="feather icon-file-text"></i></span><span className="pcoded-mtext">Form elements</span></NavLink>
                            </li>
                            <li data-username="Table bootstrap datatable footable" className="nav-item">
                                <NavLink to="tbl_bootstrap.html" className="nav-link "><span className="pcoded-micon"><i className="feather icon-server"></i></span><span className="pcoded-mtext">Table</span></NavLink>
                            </li>
                            <li className="nav-item pcoded-menu-caption">
                                <label>Chart & Maps</label>
                            </li>
                            <li data-username="Charts Morris" className="nav-item"><NavLink to="chart-morris.html" className="nav-link "><span className="pcoded-micon"><i className="feather icon-pie-chart"></i></span><span className="pcoded-mtext">Chart</span></NavLink></li>
                            <li data-username="Maps Google" className="nav-item"><NavLink to="map-google.html" className="nav-link "><span className="pcoded-micon"><i className="feather icon-map"></i></span><span className="pcoded-mtext">Maps</span></NavLink></li>
                            <li className="nav-item pcoded-menu-caption">
                                <label>Pages</label>
                            </li>
                            <li data-username="Authentication Sign up Sign in reset password Change password Personal information profile settings map form subscribe" className="nav-item pcoded-hasmenu">
                                <a href="javascript:" className="nav-link "><span className="pcoded-micon"><i className="feather icon-lock"></i></span><span className="pcoded-mtext">Authentication</span></a>
                                <ul className="pcoded-submenu">
                                    <li className=""><NavLink to="auth-signup.html" className="" target="_blank">Sign up</NavLink></li>
                                    <li className=""><NavLink to="auth-signin.html" className="" target="_blank">Sign in</NavLink></li>
                                </ul>
                            </li>
                            <li data-username="Sample Page" className="nav-item"><NavLink to="sample-page.html" className="nav-link"><span className="pcoded-micon"><i className="feather icon-sidebar"></i></span><span className="pcoded-mtext">Sample page</span></NavLink></li>
                            <li data-username="Disabled Menu" className="nav-item disabled"><a href="javascript:" className="nav-link"><span className="pcoded-micon"><i className="feather icon-power"></i></span><span className="pcoded-mtext">Disabled menu</span></a></li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Sidebar;
