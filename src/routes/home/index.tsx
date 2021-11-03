import * as React from "react";
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
import Checkbox from "@mui/material/Checkbox";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
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
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Home() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [alignment, setAlignment] = React.useState<string | null>("left");

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    setAlignment(newAlignment);
  };

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  return (
    <div>
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
            <Typography>赤城 騎馬数（デッキ人数）</Typography>
            <ToggleButtonGroup
              value={alignment}
              exclusive
              onChange={handleAlignment}
              aria-label="text alignment"
            >
              <ToggleButton value="left" aria-label="left aligned">
                1
              </ToggleButton>
              <ToggleButton value="center" aria-label="centered">
                2
              </ToggleButton>
              <ToggleButton value="right" aria-label="right aligned">
                3
              </ToggleButton>
              <ToggleButton value="justify" aria-label="justified">
                4
              </ToggleButton>
            </ToggleButtonGroup>
            <div>
              <Typography>1分の駐屯数</Typography>
              <TextField
                id="outlined-number"
                label="Number"
                type="number"
                defaultValue="38"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </div>
          </AccordionDetails>
        </Accordion>
        <TabPanel value={value} index={0}>
          <p>傾国のおにぎり計算エリア</p>
          <div>
            守る時間
            <TextField
              id="outlined-number"
              label="Number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
            分
            <TextField
              id="outlined-number"
              label="Number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
            />
            秒
          </div>
          <div>
            <Checkbox {...label} />
            今から終了まで
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <p>群雄のおにぎり計算エリア</p>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <p>おにぎり一覧表を表示</p>
        </TabPanel>
      </Box>
    </div>
  );
}
