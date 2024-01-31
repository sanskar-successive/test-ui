
export function getCsvUploadColumns() {
    return [
      {
        title: 'Records Processed',
        dataIndex: 'recordsProcessed',
        key: 'recordsProcessed',
      },
      {
        title: 'Errors',
        dataIndex: 'totalErrors',
        key: 'totalErrors',
      },
      {
        title: 'Time Taken',
        dataIndex: 'timeTaken',
        key: 'timeTaken',
      },
      {
        title: 'Id',
        dataIndex: 'session_id',
        key: 'session_id',
      },
      {
        title: 'Created At',
        dataIndex: 'createdAt',
        key: 'createdAt',
      },
    ];
  }
  