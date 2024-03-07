import { useState, useEffect } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, Stack, TextField, Typography } from "@mui/material";
import DetailedIndustrySearch, { IDataNode } from '../../components/dialog/DetailedIndustrySearch';
import { contact_search_Api, looking_indusrty_Api, looking_intent_topics_Api, looking_naice_code_Api, looking_revenue_Api } from "../../services/zoomInfoApis";
import { MdExpandMore, MdOutlineCancel } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import { FiUser } from "react-icons/fi";
import { BiGroup } from "react-icons/bi";
import { VscSettings } from "react-icons/vsc";
import { MuiCss } from '../../style/MuiCss';
import Table from '../../components/table/Table';
interface NaiceCode {
  Id: string;
  Name: string;
}

const ContactSearch = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [naiceCodes, setNaiceCodes] = useState<NaiceCode[]>([]);
  const [industries, setIndustries] = useState<NaiceCode[]>([]);
  const [revenueList, setRevenueList] = useState([]);
  const [intentTopics, setIntentTopics] = useState([]);
  const [selectedItems, setSelectedItems] = useState<IDataNode[]>([]);
  const [naicecodesstring, setnaicecodesstring] = useState('');
  const [displayData, setDisplayData] = useState([])
  const [maxResults, setMaxResults] = useState('')

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const getNaiceCodes = async () => {
    try {
      const res = await looking_naice_code_Api();
      if (res) {
        setNaiceCodes(res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getIndusrty = async () => {
    try {
      const res = await looking_indusrty_Api();
      if (res) {
        setIndustries(res?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRevenue = async () => {
    try {
      const res = await looking_revenue_Api();
      if (res) {
        setRevenueList(res?.data);
        console.log(res?.data, 'revenue list');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getIntentTopics = async () => {
    try {
      const res = await looking_intent_topics_Api();
      if (res) {
        setIntentTopics(res?.data?.topics);
        console.log(res?.data?.topics, 'revenue list');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNaiceCodes();
    getIndusrty();
    getRevenue();
    getIntentTopics();
  }, []);

  const setSelectedItemsInParent = (items: IDataNode[]) => {
    setSelectedItems(items);
  };

  /* this is important function for remove selected items */
  // const removeSelectedItem = (id: string) => {
  //   setSelectedItems(currentItems => currentItems.filter(item => item.Id !== id));
  // };

  useEffect(() => {

    if (selectedItems) {
      setnaicecodesstring(selectedItems.map(item => item.Id).join(", "))
    }
  }, [selectedItems]);

  useEffect(()=>{},[industries,naiceCodes,revenueList,intentTopics])

  const contats_Api = async () => {
    const body = {
      "naicsCodes": naicecodesstring,
      "rpp": 100,
    }
    try {
      const res = await contact_search_Api(body);
      if (res) {
        setDisplayData(res?.data?.data)
        setMaxResults(res?.data?.maxResults);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    contats_Api()
  }, [naicecodesstring])

  return (
    <>
      <Box display={'flex'} gap={4}>
        <Box width={'25vw'} bgcolor={'#1B2430'} >
          <Box p={1} sx={{ height: 'calc(100vh - 80px)', overflowY: 'auto' }}>
            <Typography sx={{ color: '#EEEEEE' }}> Company</Typography>
            <Accordion sx={{ bgcolor: '#1b2430', color: '#EEEEEE', ...MuiCss.filteraccordian }}>
              <AccordionSummary sx={{ ...MuiCss.filteraccordiansummary }} expandIcon={<MdExpandMore size={20} color='#FFF' />}><VscSettings /> &nbsp; Industry</AccordionSummary>
              <AccordionDetails>
                <Accordion sx={{ bgcolor: '#1b2430', color: '#EEEEEE', ...MuiCss.filteraccordian }}>
                  <AccordionSummary sx={{ ...MuiCss.filteraccordiansummary }} expandIcon={<MdExpandMore size={20} color='#FFF' />}> Primary Industry</AccordionSummary>
                  <AccordionDetails>
                    <Box height={'100px'} sx={{ overflowX: 'auto' }}>
                      {industries.map((item: any) => {
                        return (
                          <Box key={item.Id} ><Checkbox style={{ color: '#fff' }} />{item.Name}</Box>
                        )
                      })}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </AccordionDetails>
              <AccordionDetails onClick={() => setOpenDialog(true)}>Detailed Industry Search &nbsp; <FaExternalLinkAlt /></AccordionDetails>
            </Accordion>
            <Accordion sx={{ bgcolor: '#1b2430', color: '#EEEEEE', ...MuiCss.filteraccordian }}>
              <AccordionSummary sx={{ ...MuiCss.filteraccordiansummary }} expandIcon={<MdExpandMore size={20} color='#FFF' />}><BiGroup /> &nbsp; Business Size</AccordionSummary>
              <AccordionDetails>
                <Box >
                 <Typography variant='body2' color={'#eeeeee'}> Employee Count</Typography>
                  <Stack direction={'row'} gap={1}>
                    <TextField size='small' placeholder='Min' sx={{ width: 100, bgcolor: '#DADADA', borderRadius: 2 }} />
                    <span style={{ display: 'flex', alignItems: 'center' }}>-</span>
                    <TextField size='small' placeholder='Max' sx={{ width: 100, bgcolor: '#DADADA', borderRadius: 2 }} />
                  </Stack>
                </Box>
                <Box >
                <Typography variant='body2' color={'#eeeeee'}> Revenue </Typography>
                  <Stack direction={'row'} gap={1}>
                    <TextField size='small' placeholder='Min' sx={{ width: 100, bgcolor: '#DADADA', borderRadius: 2 }} />
                    <span style={{ display: 'flex', alignItems: 'center' }}>-</span>
                    <TextField size='small' placeholder='Max' sx={{ width: 100, bgcolor: '#DADADA', borderRadius: 2 }} />
                  </Stack>
                </Box>
              </AccordionDetails>
              <Accordion sx={{ bgcolor: '#1b2430', color: '#EEEEEE', ...MuiCss.filteraccordian }}>
                <AccordionSummary sx={{ ...MuiCss.filteraccordiansummary }} expandIcon={<MdExpandMore size={20} color='#EEEEEE' />}><FiUser /> &nbsp; Company Name</AccordionSummary>
                <AccordionDetails>
                  <TextField size='small' sx={{ ...MuiCss.textfieldcss }} placeholder='Company Name' />
                </AccordionDetails>
              </Accordion>
            </Accordion>
            <Typography sx={{ color: '#fff' }}>Contact</Typography>
            <Accordion sx={{ bgcolor: '#1b2430', color: '#EEEEEE', ...MuiCss.filteraccordian }}>
              <AccordionSummary sx={{ ...MuiCss.filteraccordiansummary }} expandIcon={<MdExpandMore size={20} color='#EEEEEE' />}><FiUser /> &nbsp; Job Title</AccordionSummary>
              <AccordionDetails>
                <TextField size='small' sx={{ ...MuiCss.textfieldcss }} placeholder='Job Title' />
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ bgcolor: '#1b2430', color: '#EEEEEE', ...MuiCss.filteraccordian }}>
              <AccordionSummary sx={{ ...MuiCss.filteraccordiansummary }} expandIcon={<MdExpandMore size={20} color='#EEEEEE' />}><FiUser /> &nbsp; Contact Name</AccordionSummary>
              <AccordionDetails>
                <TextField size='small' sx={{ ...MuiCss.textfieldcss }} placeholder='Contact Name' />
              </AccordionDetails>
            </Accordion>

            {/* here we work for state and location */}

            {/* <Typography sx={{ color: '#EEEEEE' }}>Location</Typography> */}


            <Typography sx={{ color: '#EEEEEE' }}>Buyer Intent</Typography>
            <Accordion sx={{ bgcolor: '#1b2430', color: '#fff', ...MuiCss.filteraccordian }}>
              <AccordionDetails>
                <Box height={'100px'} sx={{ overflowX: 'auto' }}>
                  {intentTopics.map((item)=>{
                    return(
                      <Box key={item} ><Checkbox style={{ color: '#fff' }} />{item}</Box>
                    )
                  })}
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Box>
        {selectedItems.length ? <Box display={'flex'} flexDirection={'column'}>
          <Box   >
            {selectedItems.map(item => (
              <Box key={item.Id} >
                {item.Id} - {item.Name}
                {/* here we able to remove filter from top of table */}
                {/* <Button sx={{ p: 0 }} startIcon={<MdOutlineCancel />} onClick={() => removeSelectedItem(item.Id)}></Button> */}
              </Box>
            ))}
          </Box>
          {displayData.length ? <Box display={'flex'} flexDirection={'column'}> <Table data={displayData} /><>Max Results:{maxResults}</></Box> : null}
        </Box> : <Box display={'flex'} width={'100vw'} justifyContent={'center'} alignItems={'center'}>To Get Data Apply Filter</Box>}
      </Box>
      <DetailedIndustrySearch
        openDialog={openDialog}
        handleDialogClose={handleDialogClose}
        naiceCodes={naiceCodes}
        setSelectedItemsInParent={setSelectedItemsInParent}
      />

    </>
  );
};

export default ContactSearch;
