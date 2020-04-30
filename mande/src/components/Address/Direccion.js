import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';


// reactstrap components
import {
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";

  const BootstrapInput = withStyles(theme => ({
    root: {
      'label + &': {
        marginTop: theme.spacing(2),
      },
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      border: '1px solid #ced4da',
      fontSize: 16,
      padding: '10px 26px 10px 50px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 4,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }))(InputBase);

  const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1),
    },
    marginN: {
      marginTop: theme.spacing(-1.6),
    },
  }));


  const tipoVia = ["Autopista", "Avenida", "Av. Calle", "Av. Carrera", "Calle", "Callejón", "Carrera",
    "Circular", "Diagonal", "Kilómetro", "Pasaje", "Paso", "Ramal", "Subramal", "Tramo", "Transversal", "Vereda"]

  const complementoVia =["Este","Manzana","Noreste","Noroccidente","Noroeste","Norte","Occidente","Oeste","Oriente",
                          "Sur","Sureste","Suroccidente","Suroeste","Suroriente"];

  const paises = [
                          { code: 'AD', label: 'Andorra', phone: '376' },
                          { code: 'AE', label: 'United Arab Emirates', phone: '971' },
                          { code: 'AF', label: 'Afghanistan', phone: '93' },
                          { code: 'AG', label: 'Antigua and Barbuda', phone: '1-268' },
                          { code: 'AI', label: 'Anguilla', phone: '1-264' },
                          { code: 'AL', label: 'Albania', phone: '355' },
                          { code: 'AM', label: 'Armenia', phone: '374' },
                          { code: 'AO', label: 'Angola', phone: '244' },
                          { code: 'AQ', label: 'Antarctica', phone: '672' },
                          { code: 'AR', label: 'Argentina', phone: '54' },
                          { code: 'AS', label: 'American Samoa', phone: '1-684' },
                          { code: 'AT', label: 'Austria', phone: '43' },
                          { code: 'AU', label: 'Australia', phone: '61', suggested: true },
                          { code: 'AW', label: 'Aruba', phone: '297' },
                          { code: 'AX', label: 'Alland Islands', phone: '358' },
                          { code: 'AZ', label: 'Azerbaijan', phone: '994' },
                          { code: 'BA', label: 'Bosnia and Herzegovina', phone: '387' },
                          { code: 'BB', label: 'Barbados', phone: '1-246' },
                          { code: 'BD', label: 'Bangladesh', phone: '880' },
                          { code: 'BE', label: 'Belgium', phone: '32' },
                          { code: 'BF', label: 'Burkina Faso', phone: '226' },
                          { code: 'BG', label: 'Bulgaria', phone: '359' },
                          { code: 'BH', label: 'Bahrain', phone: '973' },
                          { code: 'BI', label: 'Burundi', phone: '257' },
                          { code: 'BJ', label: 'Benin', phone: '229' },
                          { code: 'BL', label: 'Saint Barthelemy', phone: '590' },
                          { code: 'BM', label: 'Bermuda', phone: '1-441' },
                          { code: 'BN', label: 'Brunei Darussalam', phone: '673' },
                          { code: 'BO', label: 'Bolivia', phone: '591' },
                          { code: 'BR', label: 'Brazil', phone: '55' },
                          { code: 'BS', label: 'Bahamas', phone: '1-242' },
                          { code: 'BT', label: 'Bhutan', phone: '975' },
                          { code: 'BV', label: 'Bouvet Island', phone: '47' },
                          { code: 'BW', label: 'Botswana', phone: '267' },
                          { code: 'BY', label: 'Belarus', phone: '375' },
                          { code: 'BZ', label: 'Belize', phone: '501' },
                          { code: 'CA', label: 'Canada', phone: '1', suggested: true },
                          { code: 'CC', label: 'Cocos (Keeling) Islands', phone: '61' },
                          { code: 'CD', label: 'Congo, Democratic Republic of the', phone: '243' },
                          { code: 'CF', label: 'Central African Republic', phone: '236' },
                          { code: 'CG', label: 'Congo, Republic of the', phone: '242' },
                          { code: 'CH', label: 'Switzerland', phone: '41' },
                          { code: 'CI', label: "Cote d'Ivoire", phone: '225' },
                          { code: 'CK', label: 'Cook Islands', phone: '682' },
                          { code: 'CL', label: 'Chile', phone: '56' },
                          { code: 'CM', label: 'Cameroon', phone: '237' },
                          { code: 'CN', label: 'China', phone: '86' },
                          { code: 'CO', label: 'Colombia', phone: '57' },
                          { code: 'CR', label: 'Costa Rica', phone: '506' },
                          { code: 'CU', label: 'Cuba', phone: '53' },
                          { code: 'CV', label: 'Cape Verde', phone: '238' },
                          { code: 'CW', label: 'Curacao', phone: '599' },
                          { code: 'CX', label: 'Christmas Island', phone: '61' },
                          { code: 'CY', label: 'Cyprus', phone: '357' },
                          { code: 'CZ', label: 'Czech Republic', phone: '420' },
                          { code: 'DE', label: 'Germany', phone: '49', suggested: true },
                          { code: 'DJ', label: 'Djibouti', phone: '253' },
                          { code: 'DK', label: 'Denmark', phone: '45' },
                          { code: 'DM', label: 'Dominica', phone: '1-767' },
                          { code: 'DO', label: 'Dominican Republic', phone: '1-809' },
                          { code: 'DZ', label: 'Algeria', phone: '213' },
                          { code: 'EC', label: 'Ecuador', phone: '593' },
                          { code: 'EE', label: 'Estonia', phone: '372' },
                          { code: 'EG', label: 'Egypt', phone: '20' },
                          { code: 'EH', label: 'Western Sahara', phone: '212' },
                          { code: 'ER', label: 'Eritrea', phone: '291' },
                          { code: 'ES', label: 'Spain', phone: '34' },
                          { code: 'ET', label: 'Ethiopia', phone: '251' },
                          { code: 'FI', label: 'Finland', phone: '358' },
                          { code: 'FJ', label: 'Fiji', phone: '679' },
                          { code: 'FK', label: 'Falkland Islands (Malvinas)', phone: '500' },
                          { code: 'FM', label: 'Micronesia, Federated States of', phone: '691' },
                          { code: 'FO', label: 'Faroe Islands', phone: '298' },
                          { code: 'FR', label: 'France', phone: '33', suggested: true },
                          { code: 'GA', label: 'Gabon', phone: '241' },
                          { code: 'GB', label: 'United Kingdom', phone: '44' },
                          { code: 'GD', label: 'Grenada', phone: '1-473' },
                          { code: 'GE', label: 'Georgia', phone: '995' },
                          { code: 'GF', label: 'French Guiana', phone: '594' },
                          { code: 'GG', label: 'Guernsey', phone: '44' },
                          { code: 'GH', label: 'Ghana', phone: '233' },
                          { code: 'GI', label: 'Gibraltar', phone: '350' },
                          { code: 'GL', label: 'Greenland', phone: '299' },
                          { code: 'GM', label: 'Gambia', phone: '220' },
                          { code: 'GN', label: 'Guinea', phone: '224' },
                          { code: 'GP', label: 'Guadeloupe', phone: '590' },
                          { code: 'GQ', label: 'Equatorial Guinea', phone: '240' },
                          { code: 'GR', label: 'Greece', phone: '30' },
                          { code: 'GS', label: 'South Georgia and the South Sandwich Islands', phone: '500' },
                          { code: 'GT', label: 'Guatemala', phone: '502' },
                          { code: 'GU', label: 'Guam', phone: '1-671' },
                          { code: 'GW', label: 'Guinea-Bissau', phone: '245' },
                          { code: 'GY', label: 'Guyana', phone: '592' },
                          { code: 'HK', label: 'Hong Kong', phone: '852' },
                          { code: 'HM', label: 'Heard Island and McDonald Islands', phone: '672' },
                          { code: 'HN', label: 'Honduras', phone: '504' },
                          { code: 'HR', label: 'Croatia', phone: '385' },
                          { code: 'HT', label: 'Haiti', phone: '509' },
                          { code: 'HU', label: 'Hungary', phone: '36' },
                          { code: 'ID', label: 'Indonesia', phone: '62' },
                          { code: 'IE', label: 'Ireland', phone: '353' },
                          { code: 'IL', label: 'Israel', phone: '972' },
                          { code: 'IM', label: 'Isle of Man', phone: '44' },
                          { code: 'IN', label: 'India', phone: '91' },
                          { code: 'IO', label: 'British Indian Ocean Territory', phone: '246' },
                          { code: 'IQ', label: 'Iraq', phone: '964' },
                          { code: 'IR', label: 'Iran, Islamic Republic of', phone: '98' },
                          { code: 'IS', label: 'Iceland', phone: '354' },
                          { code: 'IT', label: 'Italy', phone: '39' },
                          { code: 'JE', label: 'Jersey', phone: '44' },
                          { code: 'JM', label: 'Jamaica', phone: '1-876' },
                          { code: 'JO', label: 'Jordan', phone: '962' },
                          { code: 'JP', label: 'Japan', phone: '81', suggested: true },
                          { code: 'KE', label: 'Kenya', phone: '254' },
                          { code: 'KG', label: 'Kyrgyzstan', phone: '996' },
                          { code: 'KH', label: 'Cambodia', phone: '855' },
                          { code: 'KI', label: 'Kiribati', phone: '686' },
                          { code: 'KM', label: 'Comoros', phone: '269' },
                          { code: 'KN', label: 'Saint Kitts and Nevis', phone: '1-869' },
                          { code: 'KP', label: "Korea, Democratic People's Republic of", phone: '850' },
                          { code: 'KR', label: 'Korea, Republic of', phone: '82' },
                          { code: 'KW', label: 'Kuwait', phone: '965' },
                          { code: 'KY', label: 'Cayman Islands', phone: '1-345' },
                          { code: 'KZ', label: 'Kazakhstan', phone: '7' },
                          { code: 'LA', label: "Lao People's Democratic Republic", phone: '856' },
                          { code: 'LB', label: 'Lebanon', phone: '961' },
                          { code: 'LC', label: 'Saint Lucia', phone: '1-758' },
                          { code: 'LI', label: 'Liechtenstein', phone: '423' },
                          { code: 'LK', label: 'Sri Lanka', phone: '94' },
                          { code: 'LR', label: 'Liberia', phone: '231' },
                          { code: 'LS', label: 'Lesotho', phone: '266' },
                          { code: 'LT', label: 'Lithuania', phone: '370' },
                          { code: 'LU', label: 'Luxembourg', phone: '352' },
                          { code: 'LV', label: 'Latvia', phone: '371' },
                          { code: 'LY', label: 'Libya', phone: '218' },
                          { code: 'MA', label: 'Morocco', phone: '212' },
                          { code: 'MC', label: 'Monaco', phone: '377' },
                          { code: 'MD', label: 'Moldova, Republic of', phone: '373' },
                          { code: 'ME', label: 'Montenegro', phone: '382' },
                          { code: 'MF', label: 'Saint Martin (French part)', phone: '590' },
                          { code: 'MG', label: 'Madagascar', phone: '261' },
                          { code: 'MH', label: 'Marshall Islands', phone: '692' },
                          { code: 'MK', label: 'Macedonia, the Former Yugoslav Republic of', phone: '389' },
                          { code: 'ML', label: 'Mali', phone: '223' },
                          { code: 'MM', label: 'Myanmar', phone: '95' },
                          { code: 'MN', label: 'Mongolia', phone: '976' },
                          { code: 'MO', label: 'Macao', phone: '853' },
                          { code: 'MP', label: 'Northern Mariana Islands', phone: '1-670' },
                          { code: 'MQ', label: 'Martinique', phone: '596' },
                          { code: 'MR', label: 'Mauritania', phone: '222' },
                          { code: 'MS', label: 'Montserrat', phone: '1-664' },
                          { code: 'MT', label: 'Malta', phone: '356' },
                          { code: 'MU', label: 'Mauritius', phone: '230' },
                          { code: 'MV', label: 'Maldives', phone: '960' },
                          { code: 'MW', label: 'Malawi', phone: '265' },
                          { code: 'MX', label: 'Mexico', phone: '52' },
                          { code: 'MY', label: 'Malaysia', phone: '60' },
                          { code: 'MZ', label: 'Mozambique', phone: '258' },
                          { code: 'NA', label: 'Namibia', phone: '264' },
                          { code: 'NC', label: 'New Caledonia', phone: '687' },
                          { code: 'NE', label: 'Niger', phone: '227' },
                          { code: 'NF', label: 'Norfolk Island', phone: '672' },
                          { code: 'NG', label: 'Nigeria', phone: '234' },
                          { code: 'NI', label: 'Nicaragua', phone: '505' },
                          { code: 'NL', label: 'Netherlands', phone: '31' },
                          { code: 'NO', label: 'Norway', phone: '47' },
                          { code: 'NP', label: 'Nepal', phone: '977' },
                          { code: 'NR', label: 'Nauru', phone: '674' },
                          { code: 'NU', label: 'Niue', phone: '683' },
                          { code: 'NZ', label: 'New Zealand', phone: '64' },
                          { code: 'OM', label: 'Oman', phone: '968' },
                          { code: 'PA', label: 'Panama', phone: '507' },
                          { code: 'PE', label: 'Peru', phone: '51' },
                          { code: 'PF', label: 'French Polynesia', phone: '689' },
                          { code: 'PG', label: 'Papua New Guinea', phone: '675' },
                          { code: 'PH', label: 'Philippines', phone: '63' },
                          { code: 'PK', label: 'Pakistan', phone: '92' },
                          { code: 'PL', label: 'Poland', phone: '48' },
                          { code: 'PM', label: 'Saint Pierre and Miquelon', phone: '508' },
                          { code: 'PN', label: 'Pitcairn', phone: '870' },
                          { code: 'PR', label: 'Puerto Rico', phone: '1' },
                          { code: 'PS', label: 'Palestine, State of', phone: '970' },
                          { code: 'PT', label: 'Portugal', phone: '351' },
                          { code: 'PW', label: 'Palau', phone: '680' },
                          { code: 'PY', label: 'Paraguay', phone: '595' },
                          { code: 'QA', label: 'Qatar', phone: '974' },
                          { code: 'RE', label: 'Reunion', phone: '262' },
                          { code: 'RO', label: 'Romania', phone: '40' },
                          { code: 'RS', label: 'Serbia', phone: '381' },
                          { code: 'RU', label: 'Russian Federation', phone: '7' },
                          { code: 'RW', label: 'Rwanda', phone: '250' },
                          { code: 'SA', label: 'Saudi Arabia', phone: '966' },
                          { code: 'SB', label: 'Solomon Islands', phone: '677' },
                          { code: 'SC', label: 'Seychelles', phone: '248' },
                          { code: 'SD', label: 'Sudan', phone: '249' },
                          { code: 'SE', label: 'Sweden', phone: '46' },
                          { code: 'SG', label: 'Singapore', phone: '65' },
                          { code: 'SH', label: 'Saint Helena', phone: '290' },
                          { code: 'SI', label: 'Slovenia', phone: '386' },
                          { code: 'SJ', label: 'Svalbard and Jan Mayen', phone: '47' },
                          { code: 'SK', label: 'Slovakia', phone: '421' },
                          { code: 'SL', label: 'Sierra Leone', phone: '232' },
                          { code: 'SM', label: 'San Marino', phone: '378' },
                          { code: 'SN', label: 'Senegal', phone: '221' },
                          { code: 'SO', label: 'Somalia', phone: '252' },
                          { code: 'SR', label: 'Suriname', phone: '597' },
                          { code: 'SS', label: 'South Sudan', phone: '211' },
                          { code: 'ST', label: 'Sao Tome and Principe', phone: '239' },
                          { code: 'SV', label: 'El Salvador', phone: '503' },
                          { code: 'SX', label: 'Sint Maarten (Dutch part)', phone: '1-721' },
                          { code: 'SY', label: 'Syrian Arab Republic', phone: '963' },
                          { code: 'SZ', label: 'Swaziland', phone: '268' },
                          { code: 'TC', label: 'Turks and Caicos Islands', phone: '1-649' },
                          { code: 'TD', label: 'Chad', phone: '235' },
                          { code: 'TF', label: 'French Southern Territories', phone: '262' },
                          { code: 'TG', label: 'Togo', phone: '228' },
                          { code: 'TH', label: 'Thailand', phone: '66' },
                          { code: 'TJ', label: 'Tajikistan', phone: '992' },
                          { code: 'TK', label: 'Tokelau', phone: '690' },
                          { code: 'TL', label: 'Timor-Leste', phone: '670' },
                          { code: 'TM', label: 'Turkmenistan', phone: '993' },
                          { code: 'TN', label: 'Tunisia', phone: '216' },
                          { code: 'TO', label: 'Tonga', phone: '676' },
                          { code: 'TR', label: 'Turkey', phone: '90' },
                          { code: 'TT', label: 'Trinidad and Tobago', phone: '1-868' },
                          { code: 'TV', label: 'Tuvalu', phone: '688' },
                          { code: 'TW', label: 'Taiwan, Province of China', phone: '886' },
                          { code: 'TZ', label: 'United Republic of Tanzania', phone: '255' },
                          { code: 'UA', label: 'Ukraine', phone: '380' },
                          { code: 'UG', label: 'Uganda', phone: '256' },
                          { code: 'US', label: 'United States', phone: '1', suggested: true },
                          { code: 'UY', label: 'Uruguay', phone: '598' },
                          { code: 'UZ', label: 'Uzbekistan', phone: '998' },
                          { code: 'VA', label: 'Holy See (Vatican City State)', phone: '379' },
                          { code: 'VC', label: 'Saint Vincent and the Grenadines', phone: '1-784' },
                          { code: 'VE', label: 'Venezuela', phone: '58' },
                          { code: 'VG', label: 'British Virgin Islands', phone: '1-284' },
                          { code: 'VI', label: 'US Virgin Islands', phone: '1-340' },
                          { code: 'VN', label: 'Vietnam', phone: '84' },
                          { code: 'VU', label: 'Vanuatu', phone: '678' },
                          { code: 'WF', label: 'Wallis and Futuna', phone: '681' },
                          { code: 'WS', label: 'Samoa', phone: '685' },
                          { code: 'XK', label: 'Kosovo', phone: '383' },
                          { code: 'YE', label: 'Yemen', phone: '967' },
                          { code: 'YT', label: 'Mayotte', phone: '262' },
                          { code: 'ZA', label: 'South Africa', phone: '27' },
                          { code: 'ZM', label: 'Zambia', phone: '260' },
                          { code: 'ZW', label: 'Zimbabwe', phone: '263' },
                        ];

function countryToFlag(isoCode) {
    return typeof String.fromCodePoint !== 'undefined'
      ? isoCode
        .toUpperCase()
        .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
      : isoCode;
}

export default function Direccion(props) {

    const classes = useStyles();
    const [element1, setElement1] = React.useState('');
    const [element2, setElement2] = React.useState('');
    const [element3, setElement3] = React.useState('');
    const [element4, setElement4] = React.useState('');




    return (
      <>
      <FormGroup>
      <Autocomplete
        id="country-selection"
        style={{ width: 445 }}
        options={paises}
        classes={{
          option: classes.option,
        }}
        autoHighlight
        getOptionLabel={(option) => option.label}
        renderOption={(option) => (
          <React.Fragment>
            <span>{countryToFlag(option.code)}</span>
         {option.label} ({option.code})
          </React.Fragment>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Escoja su país"
            variant="outlined"
            inputProps={{
              ...params.inputProps,
              autoComplete: 'new-password', // disable autocomplete and autofill
            }}
            />
        )}
      onChange={e => props.onChangePais(e)}
      />
  </FormGroup>
      <FormGroup>
        <InputGroup className="input-group-alternative mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-planet" />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Departamento" type="text" id="departamento" onChange={e => props.functionSetState(e, 'departamento',1)}/>
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <InputGroup className="input-group-alternative mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-planet" />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Municipio" type="text" id="municipio" onChange={e => props.functionSetState(e, 'municipio',1)}/>
        </InputGroup>
      </FormGroup>
      <FormGroup>
        <InputGroup className="input-group-alternative mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>
              <i className="ni ni-planet" />
            </InputGroupText>
          </InputGroupAddon>
          <Input placeholder="Código postal" type="text" id="postalcode" onChange={e => props.functionSetState(e, 'postalcode',1)}/>
        </InputGroup>
      </FormGroup>
        <FormControl className={classes.marginN} style={{marginTop: -5}} >
          <InputLabel htmlFor="tipoVia">Tipo vía</InputLabel>
          <NativeSelect
            id="tipoVia"
            value={element1}
            onChange={e => {props.functionSetState(e, 'tipoVia',1); setElement1(e.target.value); props.changeViaState() }}
            input={<BootstrapInput  />}
          >
            <option value="Select" />
            {tipoVia.map((tipo,i) => <option value={tipo} key={i}>{tipo}</option>)}
          </NativeSelect>
        </FormControl>
        <FormControl className={classes.margin}>
          <FormGroup>
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-planet" />
                </InputGroupText>
              </InputGroupAddon>
              <Input placeholder="Nombre o número de vía" type="text" id="nombreVia" onChange={e => props.functionSetState(e, 'nombreVia',1)}/>
            </InputGroup>
          </FormGroup>
        </FormControl>
        <FormControl className={classes.marginN}>
          <InputLabel htmlFor="viaSec">Vía secundaria</InputLabel>
          <NativeSelect
            id="viaSec"
            value={element2}
            onChange={e => {props.functionSetState(e, 'viaSec',1); setElement2(e.target.value);}}
            input={<BootstrapInput  style={{marginTop:30}}/>}
            >
            <option value="Select" />
            {tipoVia.map((tipo,i) => {
              var dev;
              if(props.state.via){
              if(element1 === tipo){

              }else {
                dev = <option value={tipo} key={i}>{tipo}</option>
              }}
              return dev
            })}
            </NativeSelect>
        </FormControl>
        <FormControl className={classes.margin} style={{marginLeft: 7, marginTop:15}}>
          <FormGroup>
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-planet" />
                </InputGroupText>
              </InputGroupAddon>
              <Input placeholder="Número de vía secundaria" type="text" id="nombreViaSec" onChange={e => props.functionSetState(e, 'nombreViaSec',1)}/>
            </InputGroup>
          </FormGroup>
        </FormControl>
        <br/>
        <FormControl className={classes.marginN}>
          <InputLabel htmlFor="compViaSec">Complemento vía secundaria</InputLabel>
          <NativeSelect
            id="compViaSec"
            value={element3}
            onChange={e => {props.functionSetState(e, 'compViaSec',1); setElement3(e.target.value);}}
            input={<BootstrapInput style={{marginTop:30}}/>
            }
          >
            <option value="Select" />
            {complementoVia.map((tipo,i) => <option value={tipo} key={i}>{tipo}</option>)}
          </NativeSelect>
        </FormControl>
        <FormControl className={classes.margin} style={{marginLeft: 7, marginTop:15}}>
          <FormGroup>
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-planet" />
                </InputGroupText>
              </InputGroupAddon>
              <Input placeholder="Número de casa" type="text" id="numeroCasa" onChange={e => props.functionSetState(e, 'numeroCasa',2)}/>
            </InputGroup>
          </FormGroup>
        </FormControl>
        <FormControl className={classes.marginN}>
          <InputLabel htmlFor="comp">Complemento</InputLabel>
          <NativeSelect
            id="comp"
            value={element4}
            onChange={e => {props.functionSetState(e, 'comp',2); setElement4(e.target.value);}}
            input={<BootstrapInput style={{marginTop:20}}/>
            }
          >
            <option value="Select" />
            {complementoVia.map((tipo,i) => <option value={tipo} key={i}>{tipo}</option>)}
          </NativeSelect>
        </FormControl>
        <FormControl className={classes.margin} style={{marginLeft: 7, marginTop:5}}>
          <FormGroup>
            <InputGroup className="input-group-alternative">
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="ni ni-planet" />
                </InputGroupText>
              </InputGroupAddon>
              <Input placeholder="Barrio" type="text" id="barrio" onChange={e => props.functionSetState(e, 'barrio',2)}/>
            </InputGroup>
          </FormGroup>

        </FormControl>
      </>
    );
}
