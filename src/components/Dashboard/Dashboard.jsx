import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { Redirect } from "react-router-dom";
import ApplicationStatus from "./ApplicationStatus";
import Section from "./Section";
import Loading from "./Loading";
import ProfileMessage from "./ProfileMessage";
import AdminControl from "./AdminControl";
import QR from "./QR";
import TravelReimbursementsForm from "./Forms/TravelReimbursementsForm";
import UserProfileForm from "./Forms/UserProfileForm/UserProfileForm";
import { ProfileType } from "../Profile";
import PropTypes from "prop-types";
import { theme } from "../../Defaults";

class Dashboard extends Component {
    state = {
        loading: "Loading your personal dashboard...",
        user: null,
        openDetails: false,
        profileMSG: null,
        qr: null
    }
    UNSAFE_componentWillMount() {
        if (this.props.magic) {
            this.props.profile.Eat(this.props.magic, (msg) => {
                if (msg) {
                    console.error(msg);
                    this.setState({
                        profileMSG: { color: "warning", value: msg }
                    });
                } else {
                    this.setState({
                        profileMSG: { color: "info", value: "Magic link applied!" }
                    });
                }
                this.props.clearMagic();
            });
        }
        this.props.profile.Get((msg, data) => {
            if (msg) {
                console.error(msg);
            } else {
                if (data) {
                    delete data.auth;
                    this.setState({
                        user: data,
                        loading: false,
                        openDetails: (data.registration_status === "unregistered")
                    });
                    this.props.profile.GetQR((msg, qr) => {
                        if(msg) {
                            console.error(msg);
                        } else if (qr) {
                            console.log(qr);
                            this.setState({
                                qr
                            });
                        }
                    });
                }
            }
        });

    }

    submitUser = (user) => {
        this.setState({
            loading: "Saving your information",
            profileMSG: null,
            user,
        }, () => {
            this.props.profile.Set(this.state.user, (err) => {
                this.setState({
                    loading: false,
                    profileMSG: err ?
                        { color: "danger", value: err } :
                        { color: "success", value: "Profile Updated!" }
                });
            });
        });
    }
    render() {
        // Authorized personal only!
        if (!this.props.profile.isLoggedIn) {
            return (<Redirect to="/login"/>);
        }
        if (this.state.loading) {
            return (<Loading text={this.state.loading} />);
        }
        let user = this.state.user;
        user.phone_number = user.phone_number || "";
        user.ethnicity = user.ethnicity || "";
        user.how_you_heard_about_hackru = user.how_you_heard_about_hackru || "";
        let mobile = this.props.isMobile;
        let rolesString = "";
        Object.keys(user.role).forEach((key) => { if (user.role[key]) { rolesString += `${key}, `; }});
        rolesString = rolesString.substring(0, rolesString.length - 2);
        return (
            <Container fluid style={{ width: "100%", minHeight: "100vh", paddingTop: 90 }}>
                <Row>
                    <Col xs={9}>
                        <div className="dashboard-card">
                            <div style={{ position: "absolute", left: "calc(15px)", top: 0, height: "100%", backgroundColor: theme.accent[0], width: 10 }}></div>
                            <h1 className="display-4">Shivan</h1>
                        </div>
                    </Col>
                    <Col xs={3}>
                        <div className="dashboard-card">
                            <div style={{ position: "absolute", left: "calc(15px)", top: 0, height: "100%", backgroundColor: theme.accent[0], width: 10 }}></div>
                        </div>
                    </Col>
                </Row>
                <Row>
                </Row>
                <Row>
                    <Col>
                        Shivan
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Shivan
                    </Col>
                </Row>
                {/* <div style={{ zIndex: 3, color: "white", width: "100%", paddingTop: "4rem" }}
                    align="center">
                        <div style={{ width: "100%", textAlign: "left", marginBottom: 0, paddingTop: 35 }}>
                            <Row>
                                <Col md={8}
                                    xs={12}>
                                    <h1 className="display-4">Welcome, {user.first_name}</h1>
                                    <i>{rolesString}</i>
                                </Col>
                                <Col style={{ textAlign: "center" }}
                                    md={4}
                                    xs={12}>
                                    <img width="150"
                                        style={{ marginTop: 0 }}
                                        alt="logo"
                                        src="./assets/icons/hru-logo-white.svg" />
                                </Col>
                            </Row>
                        </div>
                        <ApplicationStatus
                            onComing={() => {
                                user.registration_status = "coming";
                                this.submitUser(user);
                            }}
                            onNotComing={() => {
                                user.registration_status = "not-coming";
                                this.submitUser(user);
                            }}
                            travelling_from={user.travelling_from}
                            status={user.registration_status}
                        />
                        {(user.registration_status === "confirmed" || user.registration_status === "waitlist" || user.registration_status === "coming" || user.registration_status === "registered" || (user.role && user.role.director) || (user.role && user.role.organizer) || (user.role && user.role.volunteer)) &&
                            <div>
                                <div style={{ width: "100%", textAlign: "left" }}>
                                    <p className="lead">Day Of</p>
                                </div>
                                <Section className="mb-5"
                                    title="Your QR Code"
                                    subtitle="Please have this avaliable when you arrive for check-in." 
                                    isOpen={true}>
                                    <div style={{ width: "100", textAlign: "center" }}>
                                        <QR email={user.email} />
                                    </div>
                                </Section>
                            </div>}
                        <div>
                            <div style={{ width: "100%", textAlign: "left" }}>
                                <p className="lead">User Profile</p>
                            </div>
                            <ProfileMessage message={this.state.profileMSG} />
                            <Section title="Basics"
                                subtitle="Introduce yourself, don't be shy!"
                                isOpen={this.state.openDetails} >
                                <UserProfileForm mobile={mobile}
                                    user={user}
                                    onChange={(user) => {
                                        this.setState({ user: user });
                                    }}
                                    onSubmit={(user) => {
                                        user.registration_status = "registered";
                                        this.submitUser(user);
                                    }}
                                    profile={this.props.profile}
                                />
                            </Section>
                            <Section className="mb-5"
                                title="Travel Reimbursements"
                                subtitle="Let us know where you're coming from!">
                                <TravelReimbursementsForm mobile={mobile}
                                    travelling_from={user.travelling_from}
                                    onSubmit={(travel) => {
                                        user.travelling_from = travel;
                                        this.submitUser(user);
                                    }} />
                            </Section>
                        </div>
                        {(user.role && user.role.director) &&
                            <AdminControl profile={this.props.profile}
                                user={user} />}
                </div> */}
            </Container>
        );
    }
}

Dashboard.propTypes = {
    clearMagic: PropTypes.func,
    isMobile: PropTypes.bool,
    magic: PropTypes.string,
    profile: ProfileType,
};

export default Dashboard;
