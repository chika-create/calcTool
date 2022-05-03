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
// import Button from "@mui/material/Button";
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
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
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

function tabMenu(index: number) {
  return {
    id: `tab-${index}`,
    "aria-controls": `tabpanel-${index}`,
  };
}

// フォームの型
interface calcFormInput {
  minNum: number;
  secNum: number;
}

export default function Home() {
  const [tabValue, setTabValue] = React.useState(0);

  // デッキ数計算用
  const inputRefDeck = useRef(null);
  // const [inputDeck, setInputDeck] = useState(false);
  // const [inputDeckError, setInputDeckError] = useState(false);

  // 城種別ごとのデッキ数
  const [alignmentRed, setAlignmentRed] = useState(false);
  const [alignmentBlue, setAlignmentBlue] = useState(false);

  // どの城種別を選択したか
  // const [castleKindsStr, setCastleKindsStr] = useState(false);

  // 計算機能用
  const inputRefNum = useRef(null);
  const inputRefSec = useRef(null);
  const [inputNumError, setInputNumError] = useState(false);
  const [inputSecError, setInputSecError] = useState(false);
  const [numNumer, setNumNumer] = useState(0);

  const tabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<calcFormInput>();

  // フォーム送信時の処理
  // const onSubmit: SubmitHandler<calcFormInput> = (data, thisvalue) => {
  //   // バリデーションチェックOK！なときに行う処理を追加
  //   calculator(minNum, secNum, deckNum);
  // };

  // 城種別ごとのデッキ数の取得
  const castleChangeRed = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignmentRed(newAlignment);
  };

  const castleChangeBlue = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignmentBlue(newAlignment);
  };

  // どの城種別で計算するか
  const castleKinds = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    // setCastleKindsStr(newAlignment);
    castleKindsSwitch(newAlignment);
    calculator();
  };

  // どの城種別を選択したかによって、デッキ数を取得★次回はこちらをロジックに組み込む！
  const castleKindsSwitch = (item) => {
    switch (item) {
      case "blue":
        console.log("chikaBlue");
        break;
      case "gold":
        console.log("chikaGold");
        break;
      default:
        console.log("chikaDefault_Red");
    }
  };

  // 計算機能
  const calculator = () => {
    const minNum = Number(getValues(["minNum"]));
    let secNum = Number(getValues(["secNum"]));
    let deckNum = Number(getValues(["deckNum"]));

    // let numSec = 0;
    let numTotal = 0;
    // let numDeck = 0;

    secNum = secNum / 60;
    numTotal = minNum + secNum;
    deckNum = 60 / deckNum;
    setNumNumer(Math.ceil((numTotal * 60) / deckNum));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={tabChange}
          aria-label="basic tabs example"
        >
          <Tab label="傾国" {...tabMenu(0)} />
          <Tab label="群雄" {...tabMenu(1)} disabled />
          <Tab label="おにぎり表" {...tabMenu(2)} />
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
              label="alignmentRed"
              value={alignmentRed}
              onChange={castleChangeRed}
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
              gridTemplateColumns: "auto 1fr",
              mb: 3,
            }}
          >
            <Typography
              sx={{
                alignSelf: "center",
              }}
            >
              青城
            </Typography>
            <ToggleButtonGroup
              label="alignmentBlue"
              value={alignmentBlue}
              onChange={castleChangeBlue}
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
              // error={inputDeckError}
              inputRef={inputRefDeck}
              // defaultValue=""
              id="outlined-basic"
              type="number"
              // label="Number"
              variant="outlined"
              helperText={inputRefDeck?.current?.validationMessage}
              label="deckNum"
              {...register("deckNum")}
              sx={{
                ml: 2,
              }}
            />
          </Box>
        </AccordionDetails>
      </Accordion>

      <TabPanel value={tabValue} index={0}>
        <Typography
          sx={{
            mb: 2,
          }}
        >
          傾国のおにぎり計算エリア
        </Typography>

        {/* handleSubmit はフォームの入力を確かめた上引数に渡した関数（onSubmit）を呼び出す */}
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
            inputRef={inputRefNum}
            // defaultValue=""
            id="outlined-basic"
            type="number"
            variant="outlined"
            helperText={inputRefNum?.current?.validationMessage}
            label="minNum"
            {...register("minNum")}
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
            inputRef={inputRefSec}
            // defaultValue=""
            id="outlined-basic"
            type="number"
            label="secNum"
            variant="outlined"
            helperText={inputRefSec?.current?.validationMessage}
            {...register("secNum")}
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
        <Box>
          <FormControlLabel control={<Checkbox />} label="今から終了まで" />
        </Box>
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <Typography>群雄のおにぎり計算エリア</Typography>
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
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
          // label="castleKinds"
          value={castleKinds}
          onChange={castleKinds}
          // onChange={handleSubmit(onSubmit)}
          aria-label="text alignment"
          exclusive
          sx={{
            ml: 2,
          }}
        >
          <ToggleButton
            value="red"
            aria-label="left aligned"
            sx={{
              width: 1 / 3,
            }}
          >
            赤城
          </ToggleButton>
          <ToggleButton
            value="blue"
            aria-label="left aligned"
            sx={{
              width: 1 / 3,
            }}
          >
            青城
          </ToggleButton>
          <ToggleButton
            value="gold"
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
            {numNumer * alignmentRed}
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
