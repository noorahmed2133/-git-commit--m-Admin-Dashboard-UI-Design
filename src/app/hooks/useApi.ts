import { useState, useEffect, useCallback } from 'react';

const BASE_URL = 'https://medpal-production-dee1.up.railway.app';

const getToken = () => localStorage.getItem('token');

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };
  const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.message || 'Something went wrong');
  return data;
}

function useFetch<T>(fetchFn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err: any) {
      setError(err.message || 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  return { data, loading, error, refetch: load };
}

export function useDashboard() {
  return useFetch(() => request<any>('/super-admin/dashboard'));
}

export function useReports() {
  return useFetch(() => request<any>('/super-admin/reports'));
}

export function useDoctors() {
  const [activeDoctors, setActiveDoctors] = useState<any[]>([]);
  const [pendingDoctors, setPendingDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [active, pending] = await Promise.all([
        request<any>('/super-admin/doctors?isVerified=true'),
        request<any>('/super-admin/doctors?isVerified=false'),
      ]);
      setActiveDoctors(active?.data ?? []);
      setPendingDoctors(pending?.data ?? []);
    } catch (err: any) {
      setError(err.message || 'Failed to load doctors');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { loadAll(); }, [loadAll]);

  const verifyDoctor = async (doctorId: string) => {
    await request('/super-admin/verify-doctor', {
      method: 'PATCH',
      body: JSON.stringify({ doctorId }),
    });
    loadAll();
  };

  const rejectDoctor = async (doctorId: string) => {
    await request('/super-admin/reject-doctor', {
      method: 'DELETE',
      body: JSON.stringify({ doctorId }),
    });
    loadAll();
  };

  return { activeDoctors, pendingDoctors, loading, error, verifyDoctor, rejectDoctor };
}

export function usePatients() {
  return useFetch(() => request<any>('/super-admin/patients'));
}

export function useUsers() {
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const doAction = async (fn: () => Promise<any>, onSuccess?: () => void) => {
    setActionLoading(true);
    setActionError(null);
    try {
      await fn();
      onSuccess?.();
    } catch (err: any) {
      setActionError(err.message || 'Action failed');
    } finally {
      setActionLoading(false);
    }
  };

  const blockUser = (userId: string | number, onSuccess?: () => void) =>
    doAction(() => request('/super-admin/block', { method: 'PATCH', body: JSON.stringify({ userId }) }), onSuccess);

  const unblockUser = (userId: string | number, onSuccess?: () => void) =>
    doAction(() => request('/super-admin/unblock', { method: 'PATCH', body: JSON.stringify({ userId }) }), onSuccess);

  const deleteUser = (userId: string | number, onSuccess?: () => void) =>
    doAction(() => request('/super-admin/delete-users', { method: 'DELETE', body: JSON.stringify({ userId }) }), onSuccess);

  return { blockUser, unblockUser, deleteUser, actionLoading, actionError };
}