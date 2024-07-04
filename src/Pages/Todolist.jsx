import React, { useState } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from 'react-router-dom'; // Import Link
import { useDispatch } from 'react-redux'; // Import Dispatch
import { alltodo, deletetodo } from "./apicall"; // Import Show and Delete Function 
import { useQuery } from '@tanstack/react-query' // Import for useQuery 
import Wrapper from '../Common/Wrapper'; // Import Wrapper
import Swal from 'sweetalert2'; // Import Sweet Alert 
import DetailsIcon from '@mui/icons-material/Details'; //Details Icon
import EditIcon from '@mui/icons-material/Edit'; // Edit Icon
import DeleteIcon from '@mui/icons-material/Delete'; // Delete Icon
import { Pagination } from '@mui/material';
import Pageloader from '../Common/Pageloader';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



const Todolist = () => {

    const dispatch = useDispatch()

    // For Pagination
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    // Get Customer For Use Query 
    const getTodo = async () => {
        const response = await dispatch(alltodo())
        return response?.payload
    }

    // Use Query Area
    const { isLoading, isError, data: tododata, error, refetch } = useQuery({
        queryKey: ['customer'],
        queryFn: getTodo
    })

    // Sort the dashboard data in descending order based on createdAt
    const sortedtododata = tododata ? [...tododata].sort((a, b) => new Date(b.Enddate) - new Date(a.Enddate)) : [];

    // Calculate total pages
    const totalPages = Math.ceil(sortedtododata?.length / itemsPerPage);

    // Get current page data
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    const currentPageData = sortedtododata.slice(startIndex, endIndex);

    // Handle page change
    const handleChangePage = (event, value) => {
        setPage(value);
    };


    // Make Handle For Delete (Start)
    const handleDelete = async (id) => {
        // For Sweet Alert
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Todo List!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!'
        });
        if (result.isConfirmed) {
            await dispatch(deletetodo(id));
            refetch()
            // After Deletation Message
            Swal.fire(
                'Deleted!',
                'Your Todo List has been deleted',
                'success'
            );
        }
    }
    // Make Handle For Delete (End)


    // For Loading 
    if (isLoading) {
        return (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                <h1><Pageloader /></h1>
            </div>
        )

    }

    // For Error
    if (isError) {
        return <h1>{error.message}</h1>
    }

    return (
        <>
            <Wrapper>

                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700, marginTop: '75px' }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Title</StyledTableCell>
                                <StyledTableCell align="center">Description</StyledTableCell>
                                <StyledTableCell align="center">End Date</StyledTableCell>
                                <StyledTableCell align="center">Is Completed</StyledTableCell>
                                <StyledTableCell align="center">Edit</StyledTableCell>
                                <StyledTableCell align="center">Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currentPageData?.slice(0, currentPageData.length).reverse()?.map((row) => (
                                <StyledTableRow key={row.id}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.Title}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.Description}</StyledTableCell>
                                    <StyledTableCell align="center">
                                        {new Date(row.Enddate).toLocaleDateString('en-GB')}
                                    </StyledTableCell>
                                    <StyledTableCell align="center">{row.isCompleted}</StyledTableCell>
                                    <StyledTableCell align="center"><Link to={`/edit/${row.id}`}><button className='btn-success'><EditIcon /></button></Link></StyledTableCell>
                                    <StyledTableCell align="center"><button onClick={() => handleDelete(row.id)} className='btn-danger'><DeleteIcon /></button></StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Pagination Indicator*/}
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handleChangePage}
                        color="primary"
                        style={{ display: 'flex', justifyContent: 'center' }}
                    />

                </TableContainer>

            </Wrapper>
        </>
    )
}

export default Todolist