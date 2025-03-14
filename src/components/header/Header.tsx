import './Header.css'

export const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className="navbar-brand d-flex align-items-center prevent-select">
                    <img className='logo me-2' src="/clock.png" alt="Pomodoro logo" />
                    <h1 className='m-0'>Pomodoro</h1>
                </div>
                {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    Navbat content
                </div> */}
            </div>
            </nav>
    )
}