interface PreviewTableProps {
  rows: Array<Record<string, unknown>>;
}

export function PreviewTable({ rows }: PreviewTableProps) {
  if (!rows.length) {
    return <p className="muted">No preview rows available.</p>;
  }

  const columns = Object.keys(rows[0]);

  return (
    <div className="table-wrap preview-wrap" role="region" aria-label="Dataset preview">
      <table className="preview-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={`preview-${index}`}>
              {columns.map((column) => (
                <td key={`${index}-${column}`}>
                  {row[column] === null || row[column] === undefined
                    ? "null"
                    : String(row[column])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
