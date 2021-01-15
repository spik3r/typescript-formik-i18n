import {
  Button,
  TextField
} from "@material-ui/core";
import {
  FieldAttributes,
  Form,
  Formik,
  useField
} from "formik";
import React from "react";
import * as Yup from "yup";
import { translateText } from "./internationalisation/nonReactTranslation";
import { Translate } from "./internationalisation/Translate";
import { TranslationProvider, useTranslation } from "./internationalisation/TranslationContext";

const InternationalisedTextField: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  ...props
}) => {
  const { showKeys } = useTranslation();
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      placeholder={translateText(showKeys, placeholder)}
      {...field}
      helperText={translateText(showKeys, errorText)}
      error={!!errorText}
    />
  );
};

const validationSchema = Yup.object().shape({
  username: Yup
    .string()
    .email("loginPage.invalidEmailError")
    .required("loginPage.requiredError"),
  password: Yup
    .string()
    .required('loginPage.requiredError')
    .min(8, 'loginPage.invalidPasswordError')
});

const App: React.FC = () => {
  return (
    <TranslationProvider>
      <div>
        <Formik
          validateOnChange={true}
          initialValues={{
            username: "",
            password: "",
          }}
          validationSchema={validationSchema}

          onSubmit={(data, { setSubmitting }) => {
            setSubmitting(true);
            // make async call
            console.log("submit: ", data);
            setSubmitting(false);
          }}
        >
          {({ values, errors, isSubmitting }) => (
            <Form>
              <div className='login-container'>
                <InternationalisedTextField placeholder="loginPage.emailPlaceHolder" name="username" type="text" />
                <br />
                <InternationalisedTextField placeholder="loginPage.passwordPlaceHolder" name="password" type="password" />
                <div>
                  <Button disabled={isSubmitting} type="submit" color="primary" >
                    <Translate translationKey='loginPage.loginButton' />
                  </Button>
                </div>
              </div>
              <hr />
              <pre>{JSON.stringify(values, null, 2)}</pre>
              <pre>{JSON.stringify(errors, null, 2)}</pre>
            </Form>
          )}
        </Formik>

      </div>
    </TranslationProvider>
  );
};

export default App;
