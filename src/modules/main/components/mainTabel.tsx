import { useEffect, useMemo } from "react"
import { usePagination, useTable } from "react-table"
import { format } from "date-fns";
import styled from "styled-components";
import { Loader } from "@mantine/core";

type Props = {
    users: any
    loading: boolean
    pageCount: number
    fetchData: Function
}

const MainTabel = ({ users, loading, pageCount: controlledPageCount, fetchData }: Props) => {

    const data = users


    const columns: any = useMemo(
        () => [
            {
                Header: 'ID',
                accessor: 'ID', // accessor is the "key" in the data
                width: 130,
                Cell: ({ value }: any) => <span style={{ color: '#7E8298' }}>{value}</span>
            },
            {
                Header: 'FirstName',
                accessor: 'FirstName', // accessor is the "key" in the data
                Cell: ({ value }: any) => value.length > 6 ? <span style={{ color: '#7E8298' }}>{value.slice(0, 6) + '...'}</span> : <span style={{ color: '#7E8298' }}>{value}</span>
            },
            {
                Header: 'City',
                accessor: 'City', // accessor is the "key" in the data
                Cell: ({ value }: any) => value.length > 6 ? <span style={{ color: '#7E8298' }}>{value.slice(0, 6) + '...'}</span> : <span style={{ color: '#7E8298' }}>{value}</span>
            },
            {
                Header: `Orientation`,
                accessor: 'Orientation', // accessor is the "key" in the data
                Cell: ({ value }: any) => `active (${value})`
            },
            {
                Header: 'ScansInPeriod',
                accessor: 'ScansInPeriod', // accessor is the "key" in the data
            },
            {
                Header: 'VIP',
                accessor: 'VIP', // accessor is the "key" in the data
            },
            {
                Header: 'CreatedAt',
                accessor: 'CreatedAt', // accessor is the "key" in the data
                Cell: ({ value }: any) => <span style={{ color: '#7E8298' }}>{format(new Date(value), `dd.MM.yyyy`)}</span>
            },
            {
                Header: 'Ban',
                accessor: 'Ban', // accessor is the "key" in the data
            },
            {
                Header: 'State',
                accessor: 'State', // accessor is the "key" in the data
                Cell: ({ value }: any) => <TabelBodyItemTdSpan>{value}</TabelBodyItemTdSpan>

            },
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex },
    }: any = useTable({
        columns,
        data,
        //@ts-ignorec
        initialState: { pageIndex: 0 },
        manualPagination: true,
        pageCount: controlledPageCount,
    },
        usePagination
    )

    const filterPages = (visiblePages: any, totalPages: number) => {
        return visiblePages.filter((page: any) => page <= totalPages);
    };

    const getVisiblePages = () => {
        if (pageOptions.length < 7) {
            return filterPages([1, 2, 3, 4, 5, 6], pageOptions.length);
        } else {
            if ((pageIndex + 1) % 5 >= 0 && (pageIndex + 1) > 4 && (pageIndex + 1) + 2 < pageOptions.length) {
                return [1, (pageIndex + 1) - 1, (pageIndex + 1), (pageIndex + 1) + 1, pageOptions.length];
            } else if ((pageIndex + 1) % 5 >= 0 && (pageIndex + 1) > 4 && (pageIndex + 1) + 2 >= pageOptions.length) {
                return [1, pageOptions.length - 3, pageOptions.length - 2, pageOptions.length - 1, pageOptions.length];
            } else {
                return [1, 2, 3, 4, 5, pageOptions.length];
            }
        }
    };

    const allNav = getVisiblePages()


    useEffect(() => {
        fetchData({ pageIndex })
    }, [fetchData, pageIndex])

    return (
        <>
            {loading ?
                <LoaderContainer>
                    <Loader color="#7242E6" size={'md'} variant={'dots'} />
                </LoaderContainer>
                :

                <Tabel {...getTableProps()}>
                    <TabelHeader>
                        {headerGroups.map((headerGroup: any) => (
                            <TabelHeaderItem {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column: any) => (
                                    <TabelHeaderItemTh {...column.getHeaderProps()}> {column.render('Header')} </TabelHeaderItemTh>
                                ))}
                            </TabelHeaderItem>
                        ))}
                    </TabelHeader>
                    {users.length ?
                        <TabelBody {...getTableBodyProps()}>
                            {rows.map((row: any) => {
                                prepareRow(row)
                                return (
                                    <TabelBodyItem {...row.getRowProps()}>
                                        {row.cells.map((cell: any) => {
                                            return (
                                                <TabelBodyItemTd {...cell.getCellProps()}> {cell.render('Cell')}</TabelBodyItemTd>
                                            )
                                        })}
                                    </TabelBodyItem>
                                )
                            })
                            }
                        </TabelBody>
                        :
                        <p>Данных нет</p>
                    }

                </Tabel>
            }

            <ContainerPagination className="pagination">
                <PreviousButton onClick={() => previousPage()} disabled={!canPreviousPage}>
                    <div>{'<'}</div>
                </PreviousButton>{' '}
                <NavNumberContainer>
                    {allNav.map((page: any, index: any, array: any) => {
                        return (
                            <NavNumberContainerItem
                                key={page}
                                active={(pageIndex + 1) === page}
                                onClick={() => gotoPage(page - 1)}
                            >
                                {array[index - 1] + 2 < page ? `...${page}` : page}
                            </NavNumberContainerItem>
                        );
                    })}
                </NavNumberContainer>
                <NextButton onClick={() => nextPage()} disabled={!canNextPage}>
                    <div>{'>'}</div>
                </NextButton>
            </ContainerPagination>
        </>
    )
}



const NavNumberContainer = styled.div`
display: flex;
`;
const NavNumberContainerItem = styled.div<{ active: boolean }>`
    cursor: pointer;
    font-family: 'Gilroy Bold';
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #7E8298;
    margin: 7px 0px;
    padding: 7px 12px;
    border-radius: 8px;
${(props) => props.active && 'color: #fff'};
${(props) => props.active && 'background: #7242E6'};
`;

const ContainerPagination = styled.div`
    display: flex;
    justify-content: end;
    padding: 30px 0;
`;

const NextButton = styled.div<{ disabled: boolean }>`
cursor: pointer;
font-family: 'Gilroy Bold';
color: #7E8298;
margin: 12px 12px;
${(props) => props.disabled && 'color: #d5d7e5'};
`;

const PreviousButton = styled.div<{ disabled: boolean }>`
cursor: pointer;
font-family: 'Gilroy Bold';
color: #7E8298;
margin: 12px 12px;
${(props) => props.disabled && 'color: #d5d7e5'};
`;

const Tabel = styled.table`
    width: 100%;
`;

const TabelBody = styled.tbody`

`;

const TabelBodyItem = styled.tr`

`;

const TabelBodyItemTd = styled.td`
font-family: 'Gilroy Bold';
font-style: normal;
font-weight: 700;
font-size: 15px;
text-align: left;
color: #000000;
padding: 19px 15px;
border-bottom: 1px dashed #E1E6EC;
max-width: 105px;
`;

const TabelBodyItemTdSpan = styled.span`
background: rgb(255, 245, 248);
    border-radius: 7px;
    padding: 6px 13px;
    color: #EE446E;
    font-size: 14px;
`;

const TabelHeader = styled.thead`
border: 1px dashed #E1E6EC;
padding: 11px 33px;
`;

const TabelHeaderItem = styled.tr`

`;

const TabelHeaderItemTh = styled.th`
font-family: 'Gilroy Bold';
font-style: normal;
font-weight: 700;
font-size: 12px;
line-height: 15px;
text-align: left;
text-transform: uppercase;
color: #B5B5C3;
vertical-align: top;
border-bottom: 1px dashed #E1E6EC;
padding-bottom: 11px;
padding-left: 15px;
padding-right: 15px;
`;

const LoaderContainer = styled.div`
    text-align: center;
    padding: 50px;
`;

export default MainTabel
