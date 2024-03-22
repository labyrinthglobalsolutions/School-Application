import React from "react";

import { FaLocationArrow, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useForm } from "react-hook-form";

import Header from "../../Home/Header";
import Footer from "../../Home/Footer";

const ContactUs = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "all",
  });
  return (
    <>
      <Header />
      <div className="pages contact">
        <h1 className="title">Contact Us</h1>
      </div>

      <div className="contact-us">
        <div className="address">
          <div className="add">
            <div className="icon">
              <FaMapMarkerAlt />
            </div>
            <p>
              22, 2nd Avenue, Kemta Estate, <br />
              Idi-Aba, Abeokuta, Ogun State
            </p>
          </div>
          <div className="add">
            <div className="icon">
              <FaPhone />
            </div>
            <p>
              0815 231 4660 <br />
              0800 000 0000
            </p>
          </div>
          <div className="add">
            <div className="icon">
              <FaLocationArrow />
            </div>
            <p>school-coe@edu.ng</p>
          </div>
        </div>
        <form
          id="contact-form"
          onSubmit={handleSubmit((data) => console.log(data))}
        >
          <p className="msg">Send us a message</p>
          {/* <div className="error"></div> */}
          <div className="input-box">
            <input
              placeholder="Name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least three characters long",
                },
                maxLength: {
                  value: 30,
                  message: "Name must be at most thirty characters long",
                },
              })}
            />
            <p style={{ color: "red" }}>{errors.name?.message}</p>
          </div>
          <div className="input-box">
            <input
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: "Email must be valid",
                },
              })}
            />
            <p style={{ color: "red" }}>{errors.email?.message}</p>
          </div>
          <div className="input-box">
            <input
              placeholder="Subject"
              {...register("subject", {
                required: "Subject is required",
                minLength: {
                  value: 3,
                  message: "Subject must be at least three characters long",
                },
                maxLength: {
                  value: 30,
                  message: "Subject must be at most thirty characters long",
                },
              })}
            />
            <p style={{ color: "red" }}>{errors.subject?.message}</p>
          </div>
          <div className="input-box">
            <textarea
              placeholder="Message"
              rows={30}
              cols={30}
              {...register("message", {
                required: "Message is required",
                minLength: {
                  value: 3,
                  message: "Message must be at least three characters long",
                },
                maxLength: {
                  value: 30,
                  message: "Message must be at most thirty characters long",
                },
              })}
            ></textarea>
            <p style={{ color: "red" }}>{errors.message?.message}</p>
          </div>
          <button id="btn" type="submit">
            Send Message
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
