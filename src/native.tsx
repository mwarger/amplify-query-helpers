import * as React from 'react';

export const QueryHandler = <DataType extends {}>({
  data,
  loading,
  error,
  children,
  refetch,
  overlay = false,
}: {
  overlay: React.ReactNode;
  data: DataType;
  refetch?: () => void;
  loading: boolean;
  error: { data: DataType; errors: any[] };
  children: ({
    data,
    refetch,
  }: {
    data: DataType;
    refetch?: () => void;
  }) => React.ReactNode;
}) => {
  if (error) {
    console.log('error', JSON.stringify(error.errors));
  }

  return overlay ? (
    <>
      {loading && overlay}
      {children({ data, refetch })}
    </>
  ) : (
    <>{children({ data, refetch })}</>
  );
};
