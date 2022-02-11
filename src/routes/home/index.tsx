import React, { useState, useRef } from "react";
import { h } from "preact";
import { useForm, SubmitHandler } from "react-hook-form";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

type Input = {
  example: number;
};

export default function Home() {
  const [value, setValue] = React.useState(0);

  // デッキ数計算用
  const inputRefDeck = useRef(null);
  const [inputDeck, setInputDeck] = useState(false);
  const [inputDeckError, setInputDeckError] = useState(false);

  // 計算機能用
  const inputRefNum = useRef(null);
  const inputRefSec = useRef(null);
  const [inputNum, setInputNum] = useState(false);
  const [inputSec, setInputSec] = useState(false);
  const [inputNumError, setInputNumError] = useState(false);
  const [inputSecError, setInputSecError] = useState(false);
  const [numNumer, setNumNumer] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  // form 動作
  const onSubmit = handleSubmit(
    (data) => console.log("hoge"),
    console.log("chika")
  );

  // 「デッキ数」入力の取得
  const handleChangeDeck = () => {
    if (inputRefDeck.current) {
      const ref = inputRefDeck.current;
      setInputDeck(Number(inputRefDeck.current.value));
      if (!ref.validity.valid) {
        setInputDeckError(true);
      } else {
        setInputDeckError(false);
      }
    }
  };

  // 「分」入力の取得
  const handleChangeNum = () => {
    if (inputRefNum.current) {
      const ref = inputRefNum.current;
      setInputNum(Number(inputRefNum.current.value));
      if (!ref.validity.valid) {
        setInputNumError(true);
      } else {
        setInputNumError(false);
      }
    }
  };

  // 「秒」入力の取得
  const handleChangeSec = () => {
    if (inputRefSec.current) {
      const ref = inputRefSec.current;
      setInputSec(Number(inputRefSec.current.value));
      if (!ref.validity.valid) {
        setInputSecError(true);
      } else {
        setInputSecError(false);
      }
    }
  };

  // 計算機能
  const calculator = (numMin, numSec2, numDeck2) => {
    let numDeck = 0;
    let numSec = 0;
    let numTotal = 0;

    numDeck = 60 / numDeck2;
    numSec = numSec2 / 60;
    numTotal = numMin + numSec;
    setNumNumer(Math.ceil((numTotal * 60) / numDeck));
  };

  calculator(inputNum, inputSec, inputDeck);

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="傾国" {...a11yProps(0)} />
          <Tab label="群雄" {...a11yProps(1)} disabled />
          <Tab label="おにぎり表" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>初期設定</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "auto 1fr",
              mb: 3,
            }}
          >
            <Typography
              sx={{
                alignSelf: "center",
              }}
            >
              赤城
            </Typography>
            <ToggleButtonGroup
              aria-label="text alignment"
              exclusive
              sx={{
                ml: 2,
              }}
            >
              <ToggleButton
                value="1"
                aria-label="left aligned"
                sx={{
                  width: 1 / 4,
                }}
              >
                1
              </ToggleButton>
              <ToggleButton
                value="2"
                aria-label="left aligned"
                sx={{
                  width: 1 / 4,
                }}
              >
                2
              </ToggleButton>
              <ToggleButton
                value="3"
                aria-label="left aligned"
                sx={{
                  width: 1 / 4,
                }}
              >
                3
              </ToggleButton>
              <ToggleButton
                value="4"
                aria-label="left aligned"
                sx={{
                  width: 1 / 4,
                }}
              >
                4
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, auto 1fr)",
            }}
          >
            <Typography
              sx={{
                alignSelf: "center",
              }}
            >
              1分の駐屯数
            </Typography>
            <TextField
              error={inputDeckError}
              // inputProps={{ maxLength: 4, pattern: "^[a-zA-Z0-9_]+$" }}
              inputRef={inputRefDeck}
              // defaultValue=""
              id="outlined-basic"
              type="number"
              label="Number"
              variant="outlined"
              helperText={inputRefDeck?.current?.validationMessage}
              onChange={handleChangeDeck}
              sx={{
                ml: 2,
              }}
            />
            {/* <TextField
              id="outlined-number"
              label="Number"
              type="number"
              defaultValue="38"
              InputLabelProps={{
                shrink: true,
              }}
              sx={{
                ml: 2,
              }}
            /> */}
          </Box>
        </AccordionDetails>
      </Accordion>

      <TabPanel value={value} index={0}>
        <Typography
          sx={{
            mb: 2,
          }}
        >
          傾国のおにぎり計算エリア
        </Typography>

        {/* handleSubmit はフォームの入力を確かめた上引数に渡した関数（onSubmit）を呼び出す */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "auto 1fr auto 1fr auto",
            }}
          >
            <Typography
              sx={{
                alignSelf: "center",
              }}
            >
              守る時間
            </Typography>
            <TextField
              error={inputNumError}
              // inputProps={{ maxLength: 4, pattern: "^[a-zA-Z0-9_]+$" }}
              inputRef={inputRefNum}
              // defaultValue=""
              id="outlined-basic"
              type="number"
              label="Number"
              variant="outlined"
              helperText={inputRefNum?.current?.validationMessage}
              onChange={handleChangeNum}
              sx={{
                ml: 2,
              }}
            />
            <Typography
              sx={{
                alignSelf: "center",
                ml: 2,
              }}
            >
              分
            </Typography>
            <TextField
              error={inputSecError}
              // inputProps={{ maxLength: 4, pattern: "^[a-zA-Z0-9_]+$" }}
              inputRef={inputRefSec}
              // defaultValue=""
              // value=""
              id="outlined-basic"
              type="number"
              label="Number"
              variant="outlined"
              helperText={inputRefSec?.current?.validationMessage}
              onChange={handleChangeSec}
              sx={{
                ml: 2,
              }}
            />

            <Typography
              sx={{
                alignSelf: "center",
                ml: 2,
              }}
            >
              秒
            </Typography>
          </Box>
          {errors.numMin && <span>This field is required 1</span>}
          {errors.numSec && <span>This field is required 2</span>}
        </form>
        <Box>
          <FormControlLabel control={<Checkbox />} label="今から終了まで" />
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Typography>群雄のおにぎり計算エリア</Typography>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Typography>おにぎり一覧表を表示</Typography>
      </TabPanel>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "auto 1fr",
          p: 3,
        }}
      >
        <Typography
          sx={{
            alignSelf: "center",
          }}
        >
          城種別
        </Typography>

        <ToggleButtonGroup
          value="test"
          aria-label="text alignment"
          exclusive
          sx={{
            ml: 2,
          }}
        >
          <ToggleButton
            value="left"
            aria-label="left aligned"
            sx={{
              width: 1 / 3,
            }}
          >
            赤城
          </ToggleButton>
          <ToggleButton
            value="left"
            aria-label="left aligned"
            sx={{
              width: 1 / 3,
            }}
          >
            青城
          </ToggleButton>
          <ToggleButton
            value="left"
            aria-label="left aligned"
            sx={{
              width: 1 / 3,
            }}
          >
            金城
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box
        sx={{
          textAlign: "center",
        }}
      >
        {/* <Button variant="contained">おにぎり計算</Button> */}
      </Box>

      <Box
        sx={{
          p: 3,
        }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr auto",
          }}
        >
          <Typography
            sx={{
              alignSelf: "center",
            }}
          >
            積み切り駐屯
          </Typography>
          <Typography
            sx={{
              fontWeight: "medium",
              fontSize: 30,
            }}
          >
            {numNumer}
          </Typography>
          <Tooltip title="ContentCopyIcon">
            <IconButton>
              <ContentCopyIcon
                sx={{
                  width: "0.8em",
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr auto",
          }}
        >
          <Typography
            sx={{
              alignSelf: "center",
            }}
          >
            再駐屯込み
          </Typography>
          <Typography
            sx={{
              fontWeight: "medium",
              fontSize: 30,
            }}
          >
            {Math.ceil(numNumer / 2)}
          </Typography>
          <Tooltip title="ContentCopyIcon">
            <IconButton>
              <ContentCopyIcon
                sx={{
                  width: "0.8em",
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr auto",
          }}
        >
          <Typography
            sx={{
              alignSelf: "center",
            }}
          >
            必要おにぎり
          </Typography>
          <Typography
            sx={{
              fontWeight: "medium",
              fontSize: 30,
            }}
          >
            1680
          </Typography>
          <Tooltip title="ContentCopyIcon">
            <IconButton>
              <ContentCopyIcon
                sx={{
                  width: "0.8em",
                }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}
