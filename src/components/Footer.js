import React from 'react';

function Footer() {
  let year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="footer__copyright">&copy; {year} Давыденко Роман</p>
    </footer>
  );
}

export default Footer;
