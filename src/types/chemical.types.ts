export interface ChemicalMaster {
  id: number; chemicalCode: string; chemicalName: string; description?: string;
  casNumber?: string; grade?: string; manufacturer?: string; hazardClass?: string;
  storageCondition?: string; defaultUom?: string; tenantId: number; createdAt: string;
}
export interface ChemicalRegistration {
  id: number; masterId: number; batchNo: string; lotNumber: string;
  quantity: number; remainingQty: number; uom: string; expiryDate: string;
  supplierId?: number; storageLocationId?: number; barcodeValue?: string;
  status: string; tenantId: number; createdAt: string;
}
export interface ChemicalStock {
  masterId: number; chemicalName: string; totalQty: number;
  availableQty: number; uom: string; expiringCount: number; criticalStock: boolean;
}
