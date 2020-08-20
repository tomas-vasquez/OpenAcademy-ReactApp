import classnames from "classnames";
import React from "react";

// reactstrap components
import {
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  UncontrolledTooltip,
} from "reactstrap";

import { onChangeNumber } from "helpers/input";
import { serverUrl } from "config";
import { countrys as telephones } from "helpers/countrys";

class OptionCountries extends React.Component {
  constructor(props) {
    super();
    this.state = {
      flag: telephones.find((element) => element.code === props.area_code).flag,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const found = telephones.find((element) => element.code === e.target.value);

    document.getElementById("code-label").innerText = "+" + found.code;
    document.getElementById("input-flag").value = found.flag;

    this.setState({
      flag: found.flag,
    });
  }

  testUrl(area_code, whatsapp_number) {
    window.open(
      "https://api.whatsap.com/send?phone=" + area_code + whatsapp_number,
      "blank"
    );
  }

  render() {
    const listItems = telephones.map((telephone) => (
      <option key={telephone.iso_code} value={telephone.code}>
        {telephone.name + " +" + telephone.code}
      </option>
    ));

    const country = telephones.find(
      (element) => element.code === this.props.area_code
    );

    return (
      <>
        <div className="form-group row showcase_row_area">
          <div className="col-md-4 text-right">
            <label className="h6" htmlFor="input90">
              País:
            </label>
          </div>
          <div className="col-md-8 showcase_content_area">
            {this.props.editing ? (
              <>
                <InputGroup>
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <img
                        src={
                          serverUrl +
                          "/storage/flags/" +
                          this.state.flag +
                          ".png"
                        }
                        alt=""
                      ></img>
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    id="input90"
                    onChange={this.handleChange}
                    type="select"
                    name="area_code"
                    defaultValue={this.props.area_code}
                    maxLength="15"
                  >
                    {listItems}
                  </Input>
                </InputGroup>
                <Input
                  tipe="text"
                  className="d-none"
                  name="flag"
                  defaultValue={this.state.flag}
                  id="input-flag"
                />
              </>
            ) : (
              <p>
                {country.name}
                <img
                  className="ml-2"
                  src={serverUrl + "/storage/flags/" + country.flag + ".png"}
                  alt=""
                />
              </p>
            )}
          </div>
        </div>

        <div className="form-group row showcase_row_area">
          <div className="col-md-4 text-right">
            <label className="h6" htmlFor="input90">
              WathsApp:
            </label>
          </div>
          <div className="col-md-8 showcase_content_area">
            {this.props.editing ? (
              <InputGroup
                // para hacer focus al input group
                className={classnames({
                  focused: this.state.default && this.state.default.focus,
                })}
              >
                <InputGroupAddon addonType="prepend">
                  <InputGroupText id="code-label">
                    {this.props.area_code !== null
                      ? "+" + this.props.area_code
                      : "+591"}
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  type="phone"
                  name="whatsapp_number"
                  defaultValue={this.props.whatsapp_number}
                  placeholder="000-000-000"
                  onChangeCapture={onChangeNumber}
                />
                <InputGroupAddon
                  onClick={(e) =>
                    this.testUrl(
                      this.props.area_code,
                      this.props.whatsapp_number
                    )
                  }
                  id={"tooltip48783807893"}
                  addonType="append"
                  style={{ cursor: "pointer" }}
                >
                  <InputGroupText>
                    <i className="fa fa-external-link-alt" />
                  </InputGroupText>
                </InputGroupAddon>
                <UncontrolledTooltip delay={0} target="tooltip48783807893">
                  Provar enlace
                </UncontrolledTooltip>
              </InputGroup>
            ) : this.props.whatsapp_number !== null &&
              this.props.whatsapp_number !== "" ? (
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  this.testUrl(
                    this.props.area_code,
                    this.props.whatsapp_number
                  );
                }}
              >
                {"+(" +
                  this.props.area_code +
                  ") " +
                  this.props.whatsapp_number}
              </a>
            ) : (
              <p>no definido</p>
            )}
          </div>
        </div>
      </>
    );
  }
}

export default OptionCountries;
