import React, { useState, useEffect } from 'react';
import Modal from '../components/Modal/Modal';
import AddIcon from '@mui/icons-material/Add';
import GrBar from '../assets/images/GrBar.png';
import GrTire from '../assets/images/GrTire.png';
import GrShaft from '../assets/images/GrShaft.png';
import GrTurbo from '../assets/images/GrTurbo.png';
import GrNitro from '../assets/images/GrNitro.png';
import RemoveIcon from '@mui/icons-material/Remove';
import GrEngine from '../assets/images/GrEngine.png';
import GrClutch from '../assets/images/GrClutch.png';
import GrMuffler from '../assets/images/GrMuffler.png';
import GrTransmission from '../assets/images/GrTransmission.png';
import GrECU from '../assets/images/GrECU.png';
import GrFree1 from '../assets/images/GrFree1.png';
import GrFree2 from '../assets/images/GrFree2.png';
import PowerFrame from '../assets/images/Power-Frame.png';
import staticTable from '../assets/images/staticTable.png';
import headerImage from '../assets/images/Header-Image.png';
import noCarSelected from '../assets/images/noCarSelected.png';
import CancelSharpIcon from '@mui/icons-material/CancelSharp';
import { carCompanies, cars, carParts } from '../utils/utils';
import { Grid, Toolbar, IconButton, Button } from '@mui/material';
import { cloneDeep } from 'lodash';
import { Box } from '@mui/system';

export const Dashboard = () => {
    const [power, setPower] = useState(0);
    const [Gas, setGas] = useState(0);
    const [carDetail, setCarDetail] = useState('');
    const [companyId, setCompanyId] = useState('');
    const [carPartsDetail, setCarPartDetail] = useState('');
    const [isCarModalOpen, setIsCarModalOpen] = useState(false);
    const [selectedCarParts, setSelectedCarParts] = useState([]);
    const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
    const [isCarPartDetailModalOpen, setIsCarPartDetailModalOpen] = useState(false);
    const [isSelectedPartsModalOpen, setIsSelectedPartsModalOpen] = useState(false);

    const upgradedPower = carDetail?.speed
        ? (carDetail?.speed +
              carDetail?.acceleration +
              carDetail?.handling +
              carDetail?.nitrous) /
          20
        : 0;

    useEffect(() => {
        setPower(upgradedPower);
    }, [upgradedPower, carDetail]);

    const handleCarDetail = (detail) => {
        setCarDetail(detail);
        setPower(upgradedPower);
        setIsCarModalOpen(false);
        setIsCompanyModalOpen(false);
    };

    const increasePower = (value) => {
        let deepValue = cloneDeep(value);
        if (carDetail) {
            if (deepValue?.type === 'engine' || deepValue?.type === 'turbo' || deepValue?.type === 'muffler') {
                if (selectedCarParts?.findIndex((item) => item?.id === deepValue?.id) === -1) {
                    setCarDetail({ ...carDetail, speed: carDetail?.speed + deepValue?.power });
                    setSelectedCarParts((selectedCarParts) => [...selectedCarParts, deepValue]);
                } else {
                    let updatedCarParts = selectedCarParts?.filter((item) => {
                        if (item?.id === deepValue?.id) {
                            setCarDetail({ ...carDetail, speed: carDetail?.speed + deepValue?.power });

                            item.power = item?.power + deepValue?.power;
                        }
                        return selectedCarParts;
                    });
                    setSelectedCarParts(updatedCarParts);
                }
            } else if (
                deepValue?.type === 'transmission' ||
                deepValue?.type === 'shaft' ||
                deepValue?.type === 'clutch'
            ) {
                if (selectedCarParts?.findIndex((item) => item?.id === deepValue?.id) === -1) {
                    setCarDetail({ ...carDetail, acceleration: carDetail?.acceleration + deepValue?.power });
                    setSelectedCarParts((selectedCarParts) => [...selectedCarParts, deepValue]);
                } else {
                    let updatedCarParts = selectedCarParts?.filter((item) => {
                        if (item?.id === deepValue?.id) {
                            setCarDetail({ ...carDetail, acceleration: carDetail?.acceleration + deepValue?.power });

                            item.power = item?.power + deepValue?.power;
                        }
                        return selectedCarParts;
                    });
                    setSelectedCarParts(updatedCarParts);
                }
            } else if (deepValue?.type === 'tire' || deepValue?.type === 'bar' || deepValue?.type === 'suspensions') {
                if (selectedCarParts?.findIndex((item) => item?.id === deepValue?.id) === -1) {
                    setCarDetail({ ...carDetail, handling: carDetail?.handling + deepValue?.power });
                    setSelectedCarParts((selectedCarParts) => [...selectedCarParts, deepValue]);
                } else {
                    let updatedCarParts = selectedCarParts?.filter((item) => {
                        if (item?.id === deepValue?.id) {
                            setCarDetail({ ...carDetail, handling: carDetail?.handling + deepValue?.power });

                            item.power = item?.power + deepValue?.power;
                        }
                        return selectedCarParts;
                    });
                    setSelectedCarParts(updatedCarParts);
                }
            } else if (deepValue?.type === 'nitrous') {
                if (selectedCarParts?.findIndex((item) => item?.id === deepValue?.id) === -1) {
                    setCarDetail({ ...carDetail, nitrous: carDetail?.nitrous + deepValue?.power });
                    setSelectedCarParts((selectedCarParts) => [...selectedCarParts, deepValue]);
                } else {
                    let updatedCarParts = selectedCarParts?.filter((item) => {
                        if (item?.id === deepValue?.id) {
                            setCarDetail({ ...carDetail, nitrous: carDetail?.nitrous + deepValue?.power });

                            item.power = item?.power + deepValue?.power;
                        }
                        return selectedCarParts;
                    });
                    setSelectedCarParts(updatedCarParts);
                }
            } else if (deepValue?.type === 'ecu') {
                if (selectedCarParts?.findIndex((item) => item?.id === deepValue?.id) === -1) {
                    setCarDetail({ ...carDetail, gasUsage: carDetail?.gasUsage + deepValue?.Gas });
                    setSelectedCarParts((selectedCarParts) => [...selectedCarParts, deepValue]);
                } else {
                    let updatedCarParts = selectedCarParts?.filter((item) => {
                        if (item?.id === deepValue?.id) {
                            setCarDetail({ ...carDetail, gasUsage: carDetail?.gasUsage + deepValue?.Gas });

                            item.Gas = item?.Gas + deepValue?.Gas;
                        }
                        return selectedCarParts;
                    });
                    setSelectedCarParts(updatedCarParts);
                }
            }
        }
        setIsCarPartDetailModalOpen(false);
    };

    const decreasePower = (value) => {
        let deepValue = cloneDeep(value);
        if (carDetail) {
            if (deepValue?.type === 'engine' || deepValue?.type === 'turbo' || deepValue?.type === 'muffler') {
                if (selectedCarParts?.findIndex((item) => item?.id === deepValue?.id) === -1) {
                    setCarDetail({ ...carDetail, speed: carDetail?.speed - deepValue?.power });
                    setSelectedCarParts((selectedCarParts) => [...selectedCarParts, deepValue]);
                } else {
                    let updatedCarParts = selectedCarParts?.filter((item) => {
                        if (item?.id === deepValue?.id) {
                            setCarDetail({ ...carDetail, speed: carDetail?.speed - deepValue?.power });

                            item.power = item?.power - deepValue?.power;
                        }
                        return selectedCarParts;
                    });
                    setSelectedCarParts(updatedCarParts);
                }
            } else if (
                deepValue?.type === 'transmission' ||
                deepValue?.type === 'shaft' ||
                deepValue?.type === 'clutch'
            ) {
                if (selectedCarParts?.findIndex((item) => item?.id === deepValue?.id) === -1) {
                    setCarDetail({ ...carDetail, acceleration: carDetail?.acceleration - deepValue?.power });
                    setSelectedCarParts((selectedCarParts) => [...selectedCarParts, deepValue]);
                } else {
                    let updatedCarParts = selectedCarParts?.filter((item) => {
                        if (item?.id === deepValue?.id) {
                            setCarDetail({ ...carDetail, acceleration: carDetail?.acceleration - deepValue?.power });

                            item.power = item?.power - deepValue?.power;
                        }
                        return selectedCarParts;
                    });
                    setSelectedCarParts(updatedCarParts);
                }
            } else if (deepValue?.type === 'tire' || deepValue?.type === 'bar' || deepValue?.type === 'suspensions') {
                if (selectedCarParts?.findIndex((item) => item?.id === deepValue?.id) === -1) {
                    setCarDetail({ ...carDetail, handling: carDetail?.handling - deepValue?.power });
                    setSelectedCarParts((selectedCarParts) => [...selectedCarParts, deepValue]);
                } else {
                    let updatedCarParts = selectedCarParts?.filter((item) => {
                        if (item?.id === deepValue?.id) {
                            setCarDetail({ ...carDetail, handling: carDetail?.handling - deepValue?.power });

                            item.power = item?.power - deepValue?.power;
                        }
                        return selectedCarParts;
                    });
                    setSelectedCarParts(updatedCarParts);
                }
            } else if (deepValue?.type === 'nitrous') {
                if (selectedCarParts?.findIndex((item) => item?.id === deepValue?.id) === -1) {
                    setCarDetail({ ...carDetail, nitrous: carDetail?.nitrous - deepValue?.power });
                    setSelectedCarParts((selectedCarParts) => [...selectedCarParts, deepValue]);
                } else {
                    let updatedCarParts = selectedCarParts?.filter((item) => {
                        if (item?.id === deepValue?.id) {
                            setCarDetail({ ...carDetail, nitrous: carDetail?.nitrous - deepValue?.power });

                            item.power = item?.power - deepValue?.power;
                        }
                        return selectedCarParts;
                    });
                    setSelectedCarParts(updatedCarParts);
                }
            } else if (deepValue?.type === 'ecu') {
                if (selectedCarParts?.findIndex((item) => item?.id === deepValue?.id) === -1) {
                    setCarDetail({ ...carDetail, gasUsage: carDetail?.gasUsage - deepValue?.Gas });
                    setSelectedCarParts((selectedCarParts) => [...selectedCarParts, deepValue]);
                } else {
                    let updatedCarParts = selectedCarParts?.filter((item) => {
                        if (item?.id === deepValue?.id) {
                            setCarDetail({ ...carDetail, gasUsage: carDetail?.gasUsage - deepValue?.Gas });

                            item.Gas = item?.Gas - deepValue?.Gas;
                        }
                        return selectedCarParts;
                    });
                    setSelectedCarParts(updatedCarParts);
                }
            }
        }
        setIsCarPartDetailModalOpen(false);
    };

    const handleCarPartsDetail = (detail) => {
        setCarPartDetail(detail);
        setIsCarPartDetailModalOpen(true);
    };

    const handleSelectedCarPartsModal = () => {
        setIsSelectedPartsModalOpen(true);
    };
    const handleSelectedCarPartsModalClose = () => {
        setIsSelectedPartsModalOpen(false);
    };

    const handleCompanyId = (id) => {
        setCompanyId(id);
        setIsCarModalOpen(true);
    };

    const handleClickOpen = () => {
        setIsCompanyModalOpen(true);
    };

    const handleCloseCompanyModal = () => {
        setIsCompanyModalOpen(false);
    };

    const handleCloseCarModal = () => {
        setIsCarModalOpen(false);
    };

    const handleCloseCarPartsModal = () => {
        setIsCarPartDetailModalOpen(false);
    };

    const carCollection = cars.filter(function (car) {
        return car.companyId === companyId;
    });

    return (
        <Grid container className="main">
            <Grid item xs={12} md={12} lg={12} className="mainDashboard">
                <img height="90%" width="25%" src={headerImage} alt="imageHeader" />
            </Grid>

            <Grid container sx={{ display: 'flex', padding: '30px 0px' }}>
                <Grid item xs={12} sm={12} md={4} lg={3} className="notificationText">
                    <p>
                        Features to be implemented on this side at a later time: Companions | True Power calcuation |
                        Power Handicap calculation | Full Boost Power Addition option | Gas to power efficiency
                        calculation ======================== Seperate things to MAYBE implement on this site, away from
                        the calculator: | Gacha simulation
                    </p>
                    {/* {selectedCarParts?.length > 0 && (
                        <Grid xs={12} md={12} lg={12} className="selectedParts">
                            <Button variant="contained" color="success" onClick={handleSelectedCarPartsModal}>
                                Selected Parts
                            </Button>
                        </Grid>
                    )} */}
                </Grid>

                <Grid item xs={12} sm={12} md={5} lg={3} className="carSelection" onClick={handleClickOpen}>
                    <img
                        height="100%"
                        width="70%"
                        src={carDetail?.image ? carDetail?.image : noCarSelected}
                        alt="unstiched"
                    />
                </Grid>

                <Grid item xs={12} sm={12} md={12} lg={6} className="power">
                    <Grid item>
                        <p className="powerValue">{power}</p>
                        <img height="80px" width="260px" src={PowerFrame} alt="unstiched" />
                        <Grid item xs={12} sm={12} md={5} lg={6} className="testBody"></Grid>
                    </Grid>
                    <Grid item sx={{ marginTop: '40px', textAlign: 'center' }}>
                        <Grid item className="tableLabel">
                            <Grid className="specifications">Speed</Grid>
                            <Grid className="specifications">Acceleration</Grid>
                            <Grid className="specifications">Handling</Grid>
                            <Grid className="specifications">Nitrous</Grid>
                            <Grid className="specifications">Gas Usage</Grid>
                        </Grid>
                        <img height="80px" width="94%" src={staticTable} alt="table" />
                        <Grid item className="tableValue">
                            <Grid className="specificationsValue">{carDetail?.speed ? carDetail?.speed : ''}</Grid>
                            <Grid className="specificationsValue">
                                {carDetail?.acceleration ? carDetail?.acceleration : ''}
                            </Grid>
                            <Grid className="specificationsValue">
                                {carDetail?.handling ? carDetail?.handling : ''}
                            </Grid>
                            <Grid className="specificationsValue">{carDetail?.nitrous ? carDetail?.nitrous : ''}</Grid>
                            <Grid className="specificationsValue">
                                {carDetail?.gasUsage ? carDetail?.gasUsage : ''}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={5} lg={6} className="testBody"></Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} className="tools">
                    <Grid>
                        <div className="imgLabel">
                            <p>Engine</p>
                        </div>
                        <img
                        src={carParts[0]?.engine.image ? carParts[0]?.engine.image : GrEngine}
                            //src={GrEngine}
                            alt="Gr1"
                            style={{
                                width: 100,
                                height: 100,
                                marginLeft: '10px',
                                marginRight: '10px',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleCarPartsDetail(carParts[0]?.engine)}
                            aria-hidden="true"
                        />
                    </Grid>
                    <Grid>
                        <div className="imgLabel">
                            <p>Transmission</p>
                        </div>
                        <img
                            src={GrTransmission}
                            alt="Gr1"
                            style={{
                                width: 100,
                                height: 100,
                                marginLeft: '10px',
                                marginRight: '10px',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleCarPartsDetail(carParts[0]?.transmission)}
                            aria-hidden="true"
                        />
                    </Grid>
                    <Grid>
                        <div className="imgLabel">
                            <p>Tire</p>
                        </div>
                        <img
                            src={GrTire}
                            alt="Gr1"
                            style={{
                                width: 100,
                                height: 100,
                                marginLeft: '10px',
                                marginRight: '10px',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleCarPartsDetail(carParts[0]?.tire)}
                            aria-hidden="true"
                        />
                    </Grid>
                    <Grid>
                        <div className="imgLabel">
                            <p>Nitrous</p>
                        </div>
                        <img
                            src={GrNitro}
                            alt="Gr1"
                            style={{
                                width: 100,
                                height: 100,
                                marginLeft: '10px',
                                marginRight: '10px',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleCarPartsDetail(carParts[0]?.Nitro)}
                            aria-hidden="true"
                        />
                    </Grid>
                    <Grid>
                        <div className="imgLabel">
                            <p>ECU</p>
                        </div>
                        <img
                            src={GrECU}
                            alt="Gr1"
                            style={{
                                width: 100,
                                height: 100,
                                marginLeft: '10px',
                                marginRight: '10px',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleCarPartsDetail(carParts[0]?.ECU)}
                            aria-hidden="true"
                        />{' '}
                    </Grid>
                    <Grid>
                        <div className="imgLabel">
                            <p>Free Part 1</p>
                        </div>
                        <img
                            src={GrFree1}
                            alt="Gr1"
                            style={{
                                width: 100,
                                height: 100,
                                marginLeft: '10px',
                                marginRight: '10px',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleCarPartsDetail(carParts[0]?.shaft)}
                            aria-hidden="true"
                        />
                    </Grid>

                    <Grid>
                        <div className="imgLabel">
                            <p>Free Part 2</p>
                        </div>
                        <img
                            src={GrFree2}
                            alt="Gr1"
                            style={{
                                width: 100,
                                height: 100,
                                marginLeft: '10px',
                                marginRight: '10px',
                                cursor: 'pointer',
                            }}
                            onClick={() => handleCarPartsDetail(carParts[0]?.tire)}
                            aria-hidden="true"
                        />
                    </Grid>
                </Grid>
            </Grid>

            <Grid item xs={12} sm={12} md={12} lg={12}>
                <p className="footer">
                    Drift Spirits Calculator created by Coolsy101 for educational purposes. Drift Spirits is created and
                    owned by Bandai Namco. Website template made by{' '}
                    <a href="https://getbootstrap.com/" className="text-white">
                        Bootstrap
                    </a>
                    , by{' '}
                    <a href="https://twitter.com/mdo" className="text-white">
                        @mdo
                    </a>
                    .
                </p>
            </Grid>

            <Modal isOpen={isCompanyModalOpen}>
                <Toolbar>
                    <IconButton edge="start" color="success" aria-label="close">
                        <CancelSharpIcon onClick={handleCloseCompanyModal} />
                    </IconButton>
                </Toolbar>
                <Grid item xs={12} sm={12} md={12} lg={12} className="carCompanies">
                    {carCompanies.map((company) => (
                        <Button
                            variant="contained"
                            color="success"
                            key={`${company.companyId}`}
                            className="companyButton"
                            onClick={() => {
                                handleCompanyId(company.companyId);
                            }}
                        >
                            {company.companyName}
                        </Button>
                    ))}
                </Grid>
            </Modal>

            <Modal isOpen={isCarModalOpen}>
                <Toolbar>
                    <IconButton edge="start" color="success" aria-label="close">
                        <CancelSharpIcon onClick={handleCloseCarModal} />
                    </IconButton>
                </Toolbar>
                <Grid item xs={12} sm={12} md={12} lg={12} className="companiesCar">
                    {carCollection[0]?.car ? (
                        carCollection[0]?.car &&
                        carCollection[0]?.car.map((car) => (
                            <img
                                src={car.image}
                                alt="collection"
                                key={car.carId}
                                style={{
                                    width: 70,
                                    height: 100,
                                    marginLeft: '3px',
                                    marginRight: '3px',
                                    cursor: 'pointer',
                                }}
                                onClick={() => handleCarDetail(car)}
                                aria-hidden="true"
                            />
                        ))
                    ) : (
                        <p style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: 'bold' }}> No Car Found</p>
                    )}
                </Grid>
            </Modal>

            <Modal isOpen={isCarPartDetailModalOpen}>
                <Toolbar>
                    <IconButton edge="start" color="success" aria-label="close">
                        <CancelSharpIcon onClick={handleCloseCarPartsModal} />
                    </IconButton>
                </Toolbar>
                <Grid item xs={12} sm={12} md={12} lg={12} className="carParts">
                    {carPartsDetail ? (
                        carPartsDetail &&
                        carPartsDetail.map((part) => (
                            <Grid item key={part.id} sx={{ display: 'inline-block' }}>
                                <Box>
                                    <img
                                        src={part.image}
                                        alt="collection"
                                        style={{
                                            width: 120,
                                            height: 120,
                                            marginLeft: '10px',
                                            marginRight: '10px',
                                            marginTop: '25px',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() => increasePower(part)}
                                        aria-hidden="true"
                                    />
                                </Box>
                                <Box>
                                    <Button
                                        sx={{ color: '#ffffff !important' }}
                                        onClick={() => increasePower(part)}
                                        //disabled={selectedCarParts[0]?.power >= selectedCarParts[0]?.maximum}
                                    >
                                        <AddIcon />
                                    </Button>
                                    <Button
                                        sx={{ color: '#ffffff !important' }}
                                        onClick={() => decreasePower(part)}
                                        //disabled={selectedCarParts[0]?.power === 0 || !selectedCarParts?.length}
                                    >
                                        <RemoveIcon />
                                    </Button>
                                </Box>
                            </Grid>
                        ))
                    ) : (
                        <p style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: 'bold' }}> No Car Found</p>
                    )}
                </Grid>
            </Modal>

{/* <Modal isOpen={isSelectedPartsModalOpen}> 
                <Toolbar>
                    <IconButton edge="start" color="success" aria-label="close">
                        <CancelSharpIcon onClick={handleSelectedCarPartsModalClose} />
                    </IconButton>
                </Toolbar>
                <Grid item xs={12} sm={12} md={12} lg={12} className="carParts">
                    {selectedCarParts ? (
                        selectedCarParts &&
                        selectedCarParts.map((part) => (
                            <Grid item key={part.id} sx={{ display: 'inline-block' }}>
                                <Box>
                                    <img
                                        src={part.image}
                                        alt="collection"
                                        style={{
                                            width: 120,
                                            height: 120,
                                            marginLeft: '10px',
                                            marginRight: '10px',
                                            marginTop: '25px',
                                            cursor: 'pointer',
                                        }}
                                        aria-hidden="true"
                                    />
                                </Box>
                                <Box sx={{ color: '#ffffff' }}>
                                    Power: {part.power} / {part.maximum}
                                </Box>
                            </Grid>
                        ))
                    ) : (
                        <p style={{ color: '#FFFFFF', fontSize: '18px', fontWeight: 'bold' }}> No Car Found</p>
                    )}
                </Grid>
            </Modal> */}
        </Grid>
    );
};