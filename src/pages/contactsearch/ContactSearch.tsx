import { useState, useEffect } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Checkbox, FormControl, MenuItem, Select, Stack, TextField, Typography } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import DetailedIndustrySearch, { IDataNode } from '../../components/dialog/DetailedIndustrySearch';
import { MdExpandMore} from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import { TbBriefcase2 } from "react-icons/tb";
import { FiUser } from "react-icons/fi";
import { BiBuildings , BiGroup } from "react-icons/bi";
import { IoLocationOutline , IoFlashOutline } from "react-icons/io5";
import { FaFileShield } from "react-icons/fa6";
import { VscSettings } from "react-icons/vsc";
import { MuiCss } from '../../style/MuiCss';
import Table from '../../components/table/Table';
import { intent_contact_handler_Api, looking_indusrtys_Api, looking_intent_topic_Api, looking_metroarea_Api, looking_naice_codes_Api, looking_revenue_range_Api, looking_states_Api } from '../../services/leadNexusApis';
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
  const [metroArea, setMetroArea] = useState([]);
  const [states, setStates] = useState([]);

  const [selectedItems, setSelectedItems] = useState<IDataNode[]>([]);
  const [displayData, setDisplayData] = useState([]);
  const [loading , setLoading]=useState(false);

  /////////////////////////////////

  const [selectedPrimaryIndustries, setSelectedPrimaryIndustries] = useState<string[]>([]);
  const [selectedStates, setSelectedStates] = useState<string[]>([]);
  const [selectedMetroArea, setSelectedMetroArea] = useState<string[]>([]);

  const [selectedIntentTopics, setSelectedIntentTopics] = useState<string[]>([]);
  const [revenue, setRevenue]=useState('');
  const [jobTitle, setJobTitle] = useState(''); 
  const [companyName, setCompanyName] = useState(''); 


  const handlePrimaryIndustryChange = (id: string) => {
    setSelectedPrimaryIndustries(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(item => item !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleIntentTopicChange = (topic: string) => {
    setSelectedIntentTopics(prevTopics => {
      if (prevTopics.includes(topic)) {
        return prevTopics.filter(item => item !== topic);
      } else {
        return [...prevTopics, topic];
      }
    });
  };

  const handleStatesChange = (id: string) => {

    setSelectedStates(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(item => item !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleMetroAreaChange = (id: string) => {

    setSelectedMetroArea(prevSelected => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter(item => item !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const handleJobTitleChange = (event) => {
    setJobTitle(event.target.value);
  };
  const handleCompanyNameChange = (event) => {
    setCompanyName(event.target.value);
  };
  
  const handleApplyFilter = () => {
    console.log("Selected Primary Industries:", selectedPrimaryIndustries);

    console.log("Selected Intent Topics:", selectedIntentTopics);

    console.log('Selected Naice Codes:', selectedItems);

    console.log('Selected States:', selectedStates);




    // Create intent_payload object
    const intent_payload = {
      // sortOrder: "desc"
    };

    // Conditionally add topics key to intent_payload
    if (selectedIntentTopics.length > 0) {
      intent_payload.topics = selectedIntentTopics;
    }

    // Create contact_payload object
    const contact_payload = {
    };

    // Conditionally add naicsCodes key to contact_payload
    if (selectedItems.length > 0) {
      contact_payload.naicsCodes = selectedItems.map(item => item.Id).join(", ");
    }
    // Conditionally add  industryCodes key to contact_payload

    if (selectedPrimaryIndustries.length > 0) {
      contact_payload.industryCodes = selectedPrimaryIndustries.map(item => item).join(", ")
    }

    // Conditionally add  Revenue key to contact_payload
    if(revenue){
      contact_payload.revenue = revenue
    }

      // Conditionally add  States key to contact_payload
      if(selectedStates.length > 0){
        contact_payload.state = selectedStates.map(item => item).join(", ")
      }

         // Conditionally add  MetroAreas key to contact_payload
         if(selectedMetroArea.length > 0){
          contact_payload.metroRegion = selectedMetroArea.map(item => item).join(", ")
        }

         // Conditionally add  MetroAreas key to contact_payload
        if(jobTitle){
          contact_payload.jobTitle = jobTitle;
        }

        if(companyName){
          contact_payload.companyName = companyName;
        }

    // Combine both payloads into a single object
    const filterPayload = {
      intent_payload,
      contact_payload
    };
    contats_Api(filterPayload);
  };


  //////////////////////////

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const getNaiceCodes = async () => {
    try {
      const res = await looking_naice_codes_Api();
      if (res) {
        setNaiceCodes(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getIndusrty = async () => {
    try {
      const res = await looking_indusrtys_Api();
      if (res) {
        setIndustries(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getRevenue = async () => {
    try {
      const res = await looking_revenue_range_Api();
      if (res) {
        setRevenueList(res?.data?.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getIntentTopics = async () => {
    try {
      const res = await looking_intent_topic_Api();
      if (res) {
        setIntentTopics(res?.data?.data?.topics);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getMetroArea = async () => {
    try {
      const res = await looking_metroarea_Api();
      if (res) {
        if(res?.data?.data ){
        setMetroArea(res?.data?.data?.filter(item => item.Id.includes("usa.")));}
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getStates = async () => {
    try {
      const res = await looking_states_Api();
      if (res) {
        if(res?.data?.data ){
        setStates(res?.data?.data.filter(item => item.Id.includes("usa.")));
        }
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
    getMetroArea();
    getStates();
  }, []);

  const setSelectedItemsInParent = (items: IDataNode[]) => {
    setSelectedItems(items);
  };

  /* this is important function for remove selected items */
  // const removeSelectedItem = (id: string) => {
  //   setSelectedItems(currentItems => currentItems.filter(item => item.Id !== id));
  // };

  const contats_Api = async (body: any) => {

    try {
      setLoading(true)
      const res = await intent_contact_handler_Api(body);
      if (res) {
        setDisplayData(res?.data);
        console.log(res?.data,'res?.datares?.datares?.datares?.data');
        
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }finally{
      setLoading(false);
    }
  }


  return (
    <>
      <Box display={'flex'} gap={4}>
        <Box width={'25vw'} bgcolor={'#1B2430'} >
          <Box p={1} sx={{ height: 'calc(100vh - 72px)', overflowY: 'auto' }}>

            {/* Company */}
            <Typography sx={{ color: '#EEEEEE' }}> Company</Typography>
            <Accordion sx={{ bgcolor: '#1b2430', color: '#EEEEEE', ...MuiCss.filteraccordian }}>
              <AccordionSummary sx={{ ...MuiCss.filteraccordiansummary }} expandIcon={<MdExpandMore size={20} color='#FFF' />}><VscSettings /> &nbsp; Industry</AccordionSummary>
              <AccordionDetails>
                {/* Primary Industry accordion */}
                <Accordion sx={{ bgcolor: '#1b2430', color: '#EEEEEE', ...MuiCss.filteraccordian }}>
                  <AccordionSummary sx={{ ...MuiCss.filteraccordiansummary }} expandIcon={<MdExpandMore size={20} color='#FFF' />}> Primary Industry
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box height={'100px'} sx={{ overflowX: 'auto' }}>
                      {industries.map((item: NaiceCode) => (
                        <Box key={item.Id} display={'flex'} alignItems={'center'} >
                          <Checkbox
                            style={{ color: '#fff' }}
                            checked={selectedPrimaryIndustries.includes(item.Id)}
                            onChange={() => handlePrimaryIndustryChange(item.Id)}
                          />
                          <Typography variant='body2' color={'#EEEEEE'}> {item.Name}</Typography>
                         
                        </Box>
                      ))}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </AccordionDetails>
              <AccordionDetails sx={{fontSize:'14px'}} onClick={() => setOpenDialog(true)}>Detailed Industry Search &nbsp; <FaExternalLinkAlt /></AccordionDetails>
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
                    {/* <TextField size='small' placeholder='Min' sx={{ width: 100, bgcolor: '#DADADA', borderRadius: 2 }} />
                    <span style={{ display: 'flex', alignItems: 'center' }}>-</span>
                    <TextField size='small' placeholder='Max' sx={{ width: 100, bgcolor: '#DADADA', borderRadius: 2 }} /> */}
                    <FormControl sx={{width:'80%'}}>
                       <Select
                         labelId="demo-simple-select-label"
                         id="demo-simple-select"
                         size='small'
                         value={revenue}
                         label="Revenue"
                         onChange={(e)=>{setRevenue(e.target.value)}}
                         sx={{bgcolor:"#EEEEEE"}}
                       >
                       { revenueList.map((item)=><MenuItem value={item.Id}>{item.Id} &nbsp;$</MenuItem>) }
                         
                       </Select>
                    </FormControl>

                  </Stack>
                </Box>
              </AccordionDetails>
             
            </Accordion>
            <Accordion sx={{ bgcolor: '#1b2430', color: '#EEEEEE', ...MuiCss.filteraccordian }}>
                <AccordionSummary sx={{ ...MuiCss.filteraccordiansummary }} expandIcon={<MdExpandMore size={20} color='#EEEEEE' />}><BiBuildings /> &nbsp; Company Name</AccordionSummary>
                <AccordionDetails>
                <TextField 
                size='small' 
                sx={{ ...MuiCss.textfieldcss }} 
                placeholder='Company Name' 
                value={companyName} 
                onChange={handleCompanyNameChange} // capture user input and update the state
               />
                </AccordionDetails>
              </Accordion>

            {/* Contact */}
            <Typography sx={{ color: '#fff' }}>Contact</Typography>
            <Accordion sx={{ bgcolor: '#1b2430', color: '#EEEEEE', ...MuiCss.filteraccordian }}>
              <AccordionSummary sx={{ ...MuiCss.filteraccordiansummary }} expandIcon={<MdExpandMore size={20} color='#EEEEEE' />}><TbBriefcase2 /> &nbsp; Job Title</AccordionSummary>
              <AccordionDetails>
              <TextField 
                size='small' 
                sx={{ ...MuiCss.textfieldcss }} 
                placeholder='Job Title' 
                value={jobTitle} 
                onChange={handleJobTitleChange} // capture user input and update the state
               />
              </AccordionDetails>
            </Accordion>
            <Accordion sx={{ bgcolor: '#1b2430', color: '#EEEEEE', ...MuiCss.filteraccordian }}>
              <AccordionSummary sx={{ ...MuiCss.filteraccordiansummary }} expandIcon={<MdExpandMore size={20} color='#EEEEEE' />}><FiUser /> &nbsp; Contact Name</AccordionSummary>
              <AccordionDetails>
                <TextField size='small' sx={{ ...MuiCss.textfieldcss }} placeholder='Contact Name' />
              </AccordionDetails>
            </Accordion>

            {/* Location */}
            <Typography sx={{ color: '#EEEEEE' }}>Location</Typography>
            <Accordion sx={{ bgcolor: '#1b2430', color: '#EEEEEE', ...MuiCss.filteraccordian }}>
                  <AccordionSummary sx={{ ...MuiCss.filteraccordiansummary }} expandIcon={<MdExpandMore size={20} color='#FFF' />}>
                    <IoLocationOutline /> &nbsp; State
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box height={'100px'} sx={{ overflowX: 'auto' }}>
                      {states.map((item: NaiceCode) => (
                        <Box key={item.Id}>
                          <Checkbox
                            style={{ color: '#fff' }}
                            checked={selectedStates.includes(item.Id)}
                            onChange={() => handleStatesChange(item.Id)}
                          />
                          {item.Name}
                        </Box>
                      ))}
                    </Box>
                  </AccordionDetails>
            </Accordion>

            <Accordion sx={{ bgcolor: '#1b2430', color: '#EEEEEE', ...MuiCss.filteraccordian }}>
                  <AccordionSummary sx={{ ...MuiCss.filteraccordiansummary }} expandIcon={<MdExpandMore size={20} color='#FFF' />}>
                    <IoLocationOutline /> &nbsp; Metro Region
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box height={'100px'} sx={{ overflowX: 'auto' }}>
                      {metroArea.map((item: NaiceCode) => (
                        <Box key={item.Id}>
                          <Checkbox
                            style={{ color: '#fff' }}
                            checked={selectedMetroArea.includes(item.Id)}
                            onChange={() => handleMetroAreaChange(item.Id)}
                          />
                          {item.Name}
                        </Box>
                      ))}
                    </Box>
                  </AccordionDetails>
            </Accordion>
            {/* Buyer Intent accordion */}
            <Typography sx={{ color: '#EEEEEE' }}>Buyer Intent</Typography>
            <Accordion sx={{ bgcolor: '#1b2430', color: '#EEEEEE', ...MuiCss.filteraccordian }}>
              <AccordionSummary sx={{ ...MuiCss.filteraccordiansummary }} expandIcon={<MdExpandMore size={20} color='#FFF' />}>
                <IoFlashOutline /> &nbsp;Select Buyer Intent
              </AccordionSummary>
              <AccordionDetails>
                <Box height={'100px'} sx={{ overflowX: 'auto' }}>
                  {intentTopics.map((item: string) => (
                    <Box key={item} display={'flex'} alignItems={'center'}>
                      <Checkbox
                        style={{ color: '#fff' }}
                        checked={selectedIntentTopics.includes(item)}
                        onChange={() => handleIntentTopicChange(item)}
                      />
                          <Typography variant='body2' color={'#EEEEEE'}> {item}</Typography>
                    </Box>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>

            {/* Insurance */}
            <Typography sx={{ color: '#EEEEEE' }}>Insurance</Typography>
            <Accordion sx={{ bgcolor: '#1b2430', color: '#EEEEEE', ...MuiCss.filteraccordian }}>
              <AccordionSummary sx={{ ...MuiCss.filteraccordiansummary }} expandIcon={<MdExpandMore size={20} color='#EEEEEE' />}><FaFileShield /> &nbsp;Select Insurance</AccordionSummary>
              <AccordionDetails>
                <TextField size='small' sx={{ ...MuiCss.textfieldcss }} placeholder='Current Carrier' />
                <FormControl sx={{width:'74%'}}>
                  <label htmlFor="">Policy Expiration</label>
                       <Select
                         labelId="demo-simple-select-label"
                         id="demo-simple-select"
                         size='small'
                         value={revenue}
                         label="Revenue"
                         onChange={(e)=>{setRevenue(e.target.value)}}
                         sx={{bgcolor:"#EEEEEE"}}
                       >
                        <MenuItem value={'3 month'}> Three Month</MenuItem>
                        <MenuItem value={'6 month'}> Six Month</MenuItem>
                        <MenuItem value={'year'}> Year</MenuItem>
                       </Select>
                    </FormControl>
              </AccordionDetails>
            </Accordion>

          </Box>
        </Box>
        <Box mt={1} width={'100vw'}>
          <Button variant="contained" onClick={handleApplyFilter}>Apply</Button>
          <Box mt={1}>
            {selectedItems.length ? <Box display={'flex'} flexDirection={'column'}>
             {/*  <Box   >
                {selectedItems.map(item => (
                  <Box key={item.Id} >
                    {item.Id} - {item.Name}
                    here we able to remove filter from top of table
                    <Button sx={{ p: 0 }} startIcon={<MdOutlineCancel />} onClick={() => removeSelectedItem(item.Id)}></Button>
                  </Box>
                ))}
              </Box> */}
              {loading && <Box sx={{height:'80vh'}} display={'flex'} justifyContent={'center'} alignItems={'center'}><CircularProgress/></Box>}
              {displayData && !loading ? <Box display={'flex'} flexDirection={'column'}><Table data={displayData} /></Box> : null}
            </Box> : <Box display={'flex'} justifyContent={'center'} alignItems={'center'}>To Get Data Apply Filter</Box>}
          
          </Box>
        </Box>
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
