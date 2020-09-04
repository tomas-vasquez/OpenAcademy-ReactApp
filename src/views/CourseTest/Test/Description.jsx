import React from "react";

import parser from "html-react-parser";
import {
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
  Button,
} from "reactstrap";

const Description = ({ test, handlerStartTest }) => {
  return (
    <>
      <CardHeader>
        <CardTitle tag="h5" className="m-0">
          <i className="fa fa-pencil mr-3" />
          {test.item_title}
        </CardTitle>
      </CardHeader>
      <CardBody>
        <div>
          <p className="mb-2">
            <strong className="text-">Descripcion de la prueva:</strong>
          </p>
          {parser(test.description)}
          <p className="mb-2 mt-4">
            <strong className="text-">
              <i className="fa fa-clock-o mr-2" />
              Tiempo de la prueva:
            </strong>
          </p>
          {test.time} minutos ({test.questions.length + 1} preguntas).
          <p className="mb-2 mt-4">
            <strong className="text-">
              <i className="fa fa-magic mr-2" />
              Importante:
            </strong>
          </p>
          <p className="m-0">
            Si no completas la prueba, puedes volver a intentar despues de{" "}
            {test.timeBeforeFail} minutos.
          </p>
        </div>
      </CardBody>
      <CardFooter className="text-center">
        <Button color="primary" onClick={handlerStartTest}>
          Iniciar <i className="fa fa-arrow-right ml-2" />
        </Button>
      </CardFooter>
    </>
  );
};

export default Description;
