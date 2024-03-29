import React, { Component } from "react";
import MailchimpSubscribe from 'react-mailchimp-subscribe';
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import Fab from "@material-ui/core/Fab";
import Tour from 'reactour';

const url = "https://txable.us5.list-manage.com/subscribe/post?u=71ce0640ca8695b91810cc50a&amp;id=fb306ed87f";

const CustomForm = ({ status, message, onValidated }) => {
  let email, name;
  const submit = () =>
    email &&
    name &&
    email.value.indexOf("@") > -1 &&
    onValidated({
      EMAIL: email.value,
      NAME: name.value
    });

  return (
    <div className="subscribe-input">
      {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
      {status === "error" && (
        <div
          style={{ color: "red" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          style={{ color: "green" }}
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}      
      <input
        className="email-input"
        ref={node => (name = node)}
        type="text"
        placeholder="Your name"
      />
      <input
        className="email-input"
        type="text"
        placeholder="Your email"        
        ref={node => (email = node)}
      />
      <Fab
        variant="extended"
        size="large"
        color="secondary"
        aria-label="Subscribe"
        className="btn-action m-8"
        onClick={submit}
      >
        <Icon className="mr-16">mail</Icon>
        Subscribe
      </Fab>
    </div>
  );
};

const steps = [
  {
    selector: '[step="first-step"]',
    content: 'This is my first Step'
  },
  {
    selector: '[step="second-step"]',
    content: 'This is my second Step'
  },
  {
    selector: '[step="third-step"]',
    content: 'This is my third Step'
  },
]

class Intro3 extends Component {
  constructor() {
    super();
    this.state = {
      isTourOpen: false
    }
    this.closeTour = this.closeTour.bind(this);
  }
  state = {};

  closeTour = () => {
    this.setState({ isTourOpen: false });
  };

  openTour = () => {
    this.setState({ isTourOpen: true });
  };

  render() {
    return (
      <section className="section section-intro1 section-intro3" id="intro3">
        <div className="container pt-0">
          <Grid container spacing={4} justify="center">
            <Grid item md={6}>
              <h1 className="section-intro1__title" step="first-step">
                The Dashboard App for Bizzy Creatives
              </h1>
              <div className="section-intro1__subtitle" step="second-step">
                Coming Soon -- Sign up to join the Beta Trial
              </div>
              {/* <button onClick={this.openTour}>Clicky</button> */}
              <div className="section-intro1__list">
                <div className="section-intro1__list__item text-muted">
                  <Icon color="secondary">check</Icon> Syncs to your Etsy shop.
                </div>
                <div className="section-intro1__list__item text-muted">
                  <Icon color="secondary">check</Icon> Syncs to your calendar.
                </div>
                <div className="section-intro1__list__item text-muted" step="third-step">
                  <Icon color="secondary">check</Icon> Syncs to your Xero account.
                </div>
              </div>
              <MailchimpSubscribe
                url={url}
                render={({ subscribe, status, message }) => (
                  <CustomForm
                    status={status}
                    message={message}
                    onValidated={formData => subscribe(formData)}
                  />
                )}
              />              
            </Grid>
            <Grid item md={6}>
              <div className="intro3__product">
                <img
                  src="./assets/images/illustrations/2.svg"
                  alt=""
                />
              </div>
            </Grid>
          </Grid>
          <Tour
            steps={steps}
            isOpen={this.state.isTourOpen}
            onRequestClose={this.closeTour}
          />
        </div>
      </section>
    );
  }
}

export default Intro3;
