const AdminNavbar = () => {
    return (
        <nav id="sidebarMenu" className="d-lg-block bg-light" style={{ width: '250px', height: '100vh', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
      <div className="position-sticky">
        <div className="list-group list-group-flush mx-3 mt-4">
          <a href="#" className="list-group-item list-group-item-action py-2 ripple" style={{ border: 'none' }}>
            <i className="fas fa-user-circle fa-fw me-3"></i><span>Your Information</span>
          </a>
          <a href="#" className="list-group-item list-group-item-action py-2 ripple active text-white bg-primary" style={{ border: 'none' }}>
            <i className="fas fa-users fa-fw me-3"></i><span>Users</span>
          </a>
          <a href="#" className="list-group-item list-group-item-action py-2 ripple" style={{ border: 'none' }}>
            <i className="fas fa-map-marker-alt fa-fw me-3"></i><span>Destinations</span>
          </a>
          <a href="#" className="list-group-item list-group-item-action py-2 ripple" style={{ border: 'none' }}>
            <i className="fas fa-route fa-fw me-3"></i><span>Tours</span>
          </a>
          <a href="#" className="list-group-item list-group-item-action py-2 ripple" style={{ border: 'none' }}>
            <i className="fas fa-calendar-check fa-fw me-3"></i><span>Bookings</span>
          </a>
        </div>
      </div>
    </nav>
    )
}

export default AdminNavbar;
