import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import axios from "axios";
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  FormFeedback,
} from "reactstrap";

function Data() {
  const [isFormValid, setFormValid] = useState(false);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    termsOfService: false,
  });

  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required("Lütfen isminizi girin.")
      .matches(/^[^\s]+(\s+[^\s]+)*$/, "İsim alanı boşluk içeremez.")
      .min(3, "En az ÜÇ harf giriniz."),
    email: Yup.string()
      .email("Lütfen geçerli bir email adresi girin.")
      .required("Lütfen email adresinizi girin."),
    password: Yup.string()
      .required("Lütfen bir şifre girin.")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Şifre en az 8 karakter, bir büyük harf, bir rakam ve bir özel karakter içermelidir."
      ),
    termsOfService: Yup.boolean().oneOf(
      [true],
      "Kullanım şartlarını kabul etmelisiniz."
    ),
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
    termsOfService: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((prevData) => ({ ...prevData, [name]: val }));

    Yup.reach(formSchema, name)
      .validate(val)
      .then((valid) => {
        setFormErrors({ ...formErrors, [name]: "" });
      })
      .catch((err) => {
        setFormErrors({ ...formErrors, [name]: err.errors[0] });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("https://reqres.in/api/users", formData).then((res) => {
      console.log("Yeni form kayıt res > ", res);
      setUsers((users) => [...users, res.data]);
    });
  };

  useEffect(() => {
    formSchema.isValid(formData).then((valid) => {
      setFormValid(valid);
    });
  }, [formData, formSchema]);

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="formData-name">Name: </Label>
          <Input
            id="formData-name"
            name="name"
            type="text"
            onChange={handleChange}
            value={formData.name}
            invalid={!!formErrors.name}
          />
          {formErrors.name && <FormFeedback> {formErrors.name} </FormFeedback>}
        </FormGroup>
        <br />
        <FormGroup>
          <Label htmlFor="formData-email">Email: </Label>
          <input
            id="formData-email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            invalid={!!formErrors.email}
          />
          {formErrors.email && (
            <FormFeedback> {formErrors.email} </FormFeedback>
          )}
        </FormGroup>

        <br />

        <FormGroup>
          <Label htmlFor="formData-password">Şifre: </Label>
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            invalid={!!formErrors.password}
            id="formData-password"
          />
          {formErrors.password && (
            <FormFeedback> {formErrors.password} </FormFeedback>
          )}
        </FormGroup>
        <br />
        <FormGroup>
          <Label htmlFor="formData-checkbox">Kullanım Şartları: </Label>
          <Input
            type="checkbox"
            name="termsOfService"
            checked={formData.termsOfService}
            onChange={handleChange}
            id="formData-checkbox"
            invalid={!!formErrors.termsOfService}
          />
          <span>Kabul ediyorum.</span>
          {formErrors.termsOfService && (
            <FormFeedback> {formErrors.termsOfService} </FormFeedback>
          )}
        </FormGroup>
        <br />
        <Button
          id="formButton"
          color="primary"
          type="submit"
          disabled={!isFormValid}
        >
          Gönder
        </Button>
      </Form>

      <div>
        <h1>USERS</h1>
        {users.map((user, index) => (
          <li id="success-message" key={index}>
            {user.name} test başarılı
          </li>
        ))}
      </div>
    </div>
  );
}
export default Data;
