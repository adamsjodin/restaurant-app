import './About.scss';

function About() {
  return (
    <>
      <section className="about">
        <section className="about__top">
          <h2>Welcome to Claddagh</h2>
          <h4>A Culinary Journey in Torrevieja, Spain</h4>
        </section>
        <figure style={{ backgroundImage: "url('/images/bar.jpg')" }} className="about__picture"></figure>
        <section className="about__bottom">
          <p>Established in 2014, Claddagh has been a proud culinary landmark in the heart of Torrevieja, Spain. With a passion for great food and a commitment to creating a welcoming atmosphere, Claddagh invites you to experience a delightful fusion of flavors in a vibrant and friendly setting.</p><br></br>
          <div>
            <h3>Our Story</h3>
            <p>At Claddagh, we believe that every meal is an opportunity to create lasting memories. Our journey began in 2014 with the vision of bringing together a diverse menu that caters to every palate. Drawing inspiration from international cuisines, we've curated a selection of mouthwatering dishes that are sure to satisfy your cravings.</p>
            <br />
          </div>
          <div>
            <h3>Culinary Delights</h3>
            <p>Dive into our menu, where every dish is crafted with care and precision. From juicy burgers and delectable pizzas to flavorful chicken dishes, fresh salads, and satisfying vegetarian options, our culinary offerings reflect a commitment to quality ingredients and exceptional taste.</p>
            <br />
          </div>
          <div>
            <h3>Weekly Specials</h3>
            <p>Join us every Wednesday for a wing extravaganza! Indulge in our "Eat as many wings as you want" special, a midweek treat for wing enthusiasts. Looking for a Sunday delight? Don't miss "Slider Sunday," where you can savor three sliders for the irresistible price of 120 kr (normally 50 kr for 1).</p>
            <br />
          </div>
        </section>
      </section>
    </>
  );
}

export default About;
