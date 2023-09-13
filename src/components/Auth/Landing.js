import React from 'react'
import '../../asstes/css/l_page.css'

function Landing() {
  return (
    <div className="mainpage">
      <header className="header-01">
        <div className="leftnavbar">
          <div className="icons">
            <i class="fa-solid fa-bars fa-lg" ></i>
          </div>
          <div className="leftnav">
            <li><a href="#">Telegram</a></li>
            <li className='na'><a href="#">Youtube</a></li>
          </div>
        </div>
        <div className="navbar">
          <h1>Volunteer school</h1>
          <nav>
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#sectiomn-02">About us</a></li>
              <li><a href="#values">Values</a></li>
              <li><a href="#">Contact Us</a></li>
              <li><a href="#">Classes</a></li>
            </ul>
          </nav>
          <div className="applybtn">
            <button type="button">Apply now</button>
          </div>
        </div>
        <section className="details">
          <div className="info">
            <h2>Volunteer School</h2>
            <p>Our school community is&nbsp;formed from pupils, parents, and staff from all over the world.</p>
          </div>
        </section>
      </header>
      <section className="sectiomn-02" id="sectiomn-02">
        <div className="content">
          <div className="aboutdetails">
            <div className="aboutcontent">
              <h1>Early years Foundation Stage</h1>
              <p>Starting Telugu Language</p>
              <h3>3-5 <sup>years old</sup></h3>
              <span>&#8594;</span>
            </div>
          </div>
          <div className="aboutdetails">
            <div className="aboutcontent">
              <h1>Early years Foundation Stage</h1>
              <p>Starting Telugu Language</p>
              <h3>3-5 <sup>years old</sup></h3>
              <span>&#8594;</span>
            </div>
          </div>
          <div className="aboutdetails">
            <div className="aboutcontent">
              <h1>Early years Foundation Stage</h1>
              <p>Starting Telugu Language</p>
              <h3>3-5 <sup>years old</sup></h3>
              <span>&#8594;</span>
            </div>
          </div>
          <div className="aboutdetails">
            <div className="aboutcontent">
              <h1>Early years Foundation Stage</h1>
              <p>Starting Telugu Language</p>
              <h3>3-5 <sup>years old</sup></h3>
              <span>&#8594;</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section-3" id="values">
        <h1 style={{ textAlign: 'center' }}>values</h1>
        <div className="v-values">
          <div>
            <span>01.</span>
            <h1>Responsible</h1>
            <p>We act mindfully and respectfully towards everyone and everything in our environment. We take personal responsibility and accountability for our actions.</p>
          </div>
          <div>
            <span>02.</span>
            <h1>Globally-minded</h1>
            <p>We celebrate the individual differences and beliefs of all people.  We actively engage in the world and the communities in which we live. </p>
          </div>
          <div>
            <span>03.</span>
            <h1>Life-long learners</h1>
            <p>We continue to learn throughout life, constantly renewing our skills and abilities.</p>
          </div>
          <div>
            <span>04.</span>
            <h1>People centered</h1>
            <p>We are a community of learners who believe everyone is talented. This is our starting point. We believe in people and value their viewpoints.</p>
          </div>
          <div>
            <span>05.</span>
            <h1>Collaborative</h1>
            <p>We interact and support with each other to achieve the best possible result. We embrace dialogue encouraging the free and respectful exchange of opinions and ideas.  We are approachable, honest and act with integrity at all times.</p>
          </div>
        </div>
      </section>
      <section className="section-4">
        <div className="contactsection">
          <div className="contact-left">
            <h1>fsZFJKHkjHZDFjkuZHFDBJKLKAFGJKDHG</h1>
          </div>
          <div className="contact-right">
            <div className="contactdetails">
              <h4>ffljkeadhftlkjHAELKFGJHlkjhgelkjAHL</h4>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div class="footer-content">
            <h3>Volunteer School</h3>
            <p>Our school community is formed from pupils, parents, and staff from all over the world.</p>
            <ul class="socials">
                <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
                <li><a href="#"><i class="fa fa-youtube"></i></a></li>
                <li><a href="#"><i class="fa fa-linkedin-square"></i></a></li>
            </ul>
        </div>
        <div class="footer-bottom">
            <p>copyright &copy; <a href="#">Volunteer School</a>  </p>
                    
        </div>

    </footer>
    </div>
  )
}

export default Landing