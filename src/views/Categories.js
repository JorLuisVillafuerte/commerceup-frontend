import React, { useState } from "react";
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import { Search } from "@material-ui/icons";
import {Card,CardHeader,CardBody,CardTitle,Table,Row,Col,} from "reactstrap";
import useTable from 'components/useTable';
import Controls from 'components/Controls/Controls';

const categorias = [
    {codigo: 'ctf001', nombre:'asd', descripcion: 'sasdad'},
    {codigo: 'ctf001', nombre:'asd', descripcion: 'sasdad'},
    {codigo: 'ctf001', nombre:'asd', descripcion: 'sasdad'},
    {codigo: 'ctf001', nombre:'asd', descripcion: 'sasdad'},
    {codigo: 'ctf001', nombre:'asd', descripcion: 'sasdad'},
    {codigo: 'ctf001', nombre:'asd', descripcion: 'sasdad'}
]


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    }
}));

const cabeceros = [
    { id: 'nombre', label: 'aaa' },
    { id: 'codigo', label: 'Email Address (Personal)' },
    { id: 'descripcion', label: 'Mobile Number' }
]

const Categories = () => {

    const classes = useStyles();
    const [registros, setRegistros] = useState(categorias);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } });
    const { TblContainer,TblHead,TblPagination,recordsAfterPagingAndSorting} = useTable(registros,cabeceros, filterFn);
    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.fullName.toLowerCase().includes(target.value))
            }
        })
    }
    return (
        <>
          <div className="content">
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Categorias</CardTitle>
                  </CardHeader>
                    <CardBody>
                        <TblContainer>
                            <TblHead />
                            <TableBody>
                                {
                                    recordsAfterPagingAndSorting().map(item =>
                                        (<TableRow key={item.id}>
                                            <TableCell>{item.fullName}</TableCell>
                                            <TableCell>{item.email}</TableCell>
                                            <TableCell>{item.mobile}</TableCell>
                                            <TableCell>{item.department}</TableCell>
                                        </TableRow>)
                                    )
                                }
                            </TableBody>
                        </TblContainer>
                        <TblPagination />

                    </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </>
      );
}
 
export default Categories;