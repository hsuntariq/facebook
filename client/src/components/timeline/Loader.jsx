import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { Card } from 'react-bootstrap'

const Loader = () => {
    return (
        <>
            <Card>
                <Card.Header>
                    <div className="d-flex gap-4 align-items-center">
                        <div className="img">
                            <Skeleton circle height={70} width={70} />
                        </div>
                        <div className="user-data">
                            <Skeleton width={100} />
                            <Skeleton width={50} />
                        </div>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Skeleton className='rounded-4' height={500} width={'100%'} />
                    <div className="row p-0 m-0 mt-2">
                        <div className="col-4 p-0 m-0  border">
                            <Skeleton width={'100%'} />
                        </div>
                        <div className="col-4 p-0 m-0  border">
                            <Skeleton width={'100%'} />

                        </div>
                        <div className="col-4 p-0 m-0  border">
                            <Skeleton width={'100%'} />

                        </div>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}

export default Loader