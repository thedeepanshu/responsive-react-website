import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { FiCheckCircle, FiSend } from "react-icons/fi";
import { colors } from "../theme";
import { ActionButton } from "./Button";

const Form = styled.form`
  display: grid;
  grid-template-columns: ${({ $compact }) => ($compact ? "1fr" : "1fr 1fr")};
  gap: 1.2rem;

  @media screen and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  grid-column: ${({ $full }) => ($full ? "1 / -1" : "auto")};

  label {
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: ${colors.muted};
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 0.85rem 1rem;
    border: 1px solid ${colors.border};
    background: ${colors.cream};
    font-size: 0.95rem;
    color: ${colors.text};
    transition: border-color 0.2s ease, background 0.2s ease;

    &:focus {
      outline: none;
      border-color: ${colors.accent};
      background: ${colors.white};
    }

    &[aria-invalid="true"] {
      border-color: ${colors.error};
    }
  }

  textarea {
    min-height: 140px;
    resize: vertical;
  }
`;

const FieldError = styled.span`
  font-size: 0.8rem;
  color: ${colors.error};
`;

const Actions = styled.div`
  grid-column: 1 / -1;

  small {
    display: block;
    margin-top: 0.8rem;
    font-size: 0.78rem;
    color: ${colors.muted};
  }
`;

const Success = styled.div`
  padding: 2.5rem 1.5rem;
  text-align: center;
  background: ${colors.cream};

  svg {
    font-size: 3rem;
    color: ${colors.success};
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.6rem;
    margin-bottom: 0.6rem;
  }

  p {
    margin-bottom: 1.5rem;
    color: ${colors.muted};
  }
`;

const FIELD_ORDER = ["name", "email", "phone", "interest", "message"];
const REQUIRED = ["name", "phone", "interest"];
const MAX_LENGTH = { name: 80, email: 120, phone: 20, message: 2000 };

const EMAIL_PATTERN =/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[\d\s()-]+$/;

const isValidPhone = (phone) => {
  const digits = phone.replace(/\D/g, "").length;
  return PHONE_PATTERN.test(phone) && digits >= 10 && digits <= 15;
};

// Name, phone and interest are required; email and message are optional,
// but an email that is filled in must be valid.
const validate = (values) => {
  const errors = {};
  const email = values.email.trim();
  const phone = values.phone.trim();

  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!phone) errors.phone = "Please enter your phone number.";
  else if (!isValidPhone(phone))
    errors.phone = "Please enter a valid phone number (10–15 digits).";
  if (email && !EMAIL_PATTERN.test(email))
    errors.email = "Please enter a valid email address.";
  if (!values.interest) errors.interest = "Please choose what you're interested in.";
  return errors;
};

const EnquiryForm = ({
  compact,
  defaultMessage = "",
  defaultInterest = "",
  submitLabel = "Send message",
  idPrefix = "enquiry",
}) => {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    interest: defaultInterest,
    message: defaultMessage,
  };
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((errs) => ({ ...errs, [name]: undefined }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);

    // Send keyboard and screen-reader users straight to the first problem.
    const firstInvalid = FIELD_ORDER.find((name) => found[name]);
    if (firstInvalid) {
      const field = document.getElementById(`${idPrefix}-${firstInvalid}`);
      if (field) field.focus();
      return;
    }

    setValues((v) => ({
      ...v,
      name: v.name.trim(),
      email: v.email.trim(),
      phone: v.phone.trim(),
      message: v.message.trim(),
    }));

    // No backend yet: simulate the request so the UX is complete.
    setStatus("sending");
    timer.current = setTimeout(() => setStatus("sent"), 900);
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setStatus("idle");
  };

  if (status === "sent") {
    return (
      <Success role="status">
        <FiCheckCircle aria-hidden="true" />
        <h3>Thank you, {values.name.trim().split(" ")[0]}!</h3>
        <p>
          Your message has been received. One of our consultants will get back
          to you within 24 hours.
        </p>
        <ActionButton type="button" $variant="primary" onClick={reset}>
          Send another message
        </ActionButton>
      </Success>
    );
  }

  const fieldProps = (name) => ({
    id: `${idPrefix}-${name}`,
    name,
    value: values[name],
    onChange,
    maxLength: MAX_LENGTH[name],
    "aria-required": REQUIRED.includes(name) || undefined,
    "aria-invalid": Boolean(errors[name]),
    "aria-describedby": errors[name] ? `${idPrefix}-${name}-error` : undefined,
  });

  const renderError = (name) =>
    errors[name] && <FieldError id={`${idPrefix}-${name}-error`}>{errors[name]}</FieldError>;

  return (
    <Form onSubmit={onSubmit} noValidate $compact={compact}>
      <Field>
        <label htmlFor={`${idPrefix}-name`}>Full name *</label>
        <input type="text" autoComplete="name" {...fieldProps("name")} />
        {renderError("name")}
      </Field>
      <Field>
        <label htmlFor={`${idPrefix}-email`}>Email</label>
        <input type="email" autoComplete="email" {...fieldProps("email")} />
        {renderError("email")}
      </Field>
      <Field>
        <label htmlFor={`${idPrefix}-phone`}>Phone *</label>
        <input
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="+91 12345 67890"
          {...fieldProps("phone")}
        />
        {renderError("phone")}
      </Field>
      {!compact && (
        <Field>
          <label htmlFor={`${idPrefix}-interest`}>I'm interested in *</label>
          <select {...fieldProps("interest")}>
            <option value="" disabled>
              Select an option
            </option>
            <option value="buying">Buying a home</option>
            <option value="renting">Renting a home</option>
            <option value="selling">Selling my property</option>
            <option value="other">Something else</option>
          </select>
          {renderError("interest")}
        </Field>
      )}
      <Field $full>
        <label htmlFor={`${idPrefix}-message`}>Message</label>
        <textarea {...fieldProps("message")} />
        {renderError("message")}
      </Field>
      <Actions>
        <ActionButton
          type="submit"
          $variant="primary"
          $block={compact}
          disabled={status === "sending"}
        >
          {status === "sending" ? "Sending..." : submitLabel} <FiSend />
        </ActionButton>
        <small>We'll never share your details. Fields marked * are required.</small>
      </Actions>
    </Form>
  );
};

export default EnquiryForm;
