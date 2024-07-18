import { TestBed } from '@angular/core/testing';

import { sampleWithRequiredData, sampleWithNewData } from '../warehouse-transaction.test-samples';

import { WarehouseTransactionFormService } from './warehouse-transaction-form.service';

describe('WarehouseTransaction Form Service', () => {
  let service: WarehouseTransactionFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WarehouseTransactionFormService);
  });

  describe('Service methods', () => {
    describe('createWarehouseTransactionFormGroup', () => {
      it('should create a new form with FormControl', () => {
        const formGroup = service.createWarehouseTransactionFormGroup();

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uid: expect.any(Object),
            code: expect.any(Object),
            name: expect.any(Object),
            imovUid: expect.any(Object),
            transactionDate: expect.any(Object),
            phaseNo: expect.any(Object),
            entryType: expect.any(Object),
            quantity: expect.any(Object),
            notes: expect.any(Object),
            personName: expect.any(Object),
            workDayId: expect.any(Object),
            submissionTime: expect.any(Object),
            submissionId: expect.any(Object),
            deleted: expect.any(Object),
            submissionUuid: expect.any(Object),
            startEntryTime: expect.any(Object),
            finishedEntryTime: expect.any(Object),
            status: expect.any(Object),
            item: expect.any(Object),
            sourceWarehouse: expect.any(Object),
            team: expect.any(Object),
            warehouse: expect.any(Object),
            activity: expect.any(Object),
          }),
        );
      });

      it('passing IWarehouseTransaction should create a new form with FormGroup', () => {
        const formGroup = service.createWarehouseTransactionFormGroup(sampleWithRequiredData);

        expect(formGroup.controls).toEqual(
          expect.objectContaining({
            id: expect.any(Object),
            uid: expect.any(Object),
            code: expect.any(Object),
            name: expect.any(Object),
            imovUid: expect.any(Object),
            transactionDate: expect.any(Object),
            phaseNo: expect.any(Object),
            entryType: expect.any(Object),
            quantity: expect.any(Object),
            notes: expect.any(Object),
            personName: expect.any(Object),
            workDayId: expect.any(Object),
            submissionTime: expect.any(Object),
            submissionId: expect.any(Object),
            deleted: expect.any(Object),
            submissionUuid: expect.any(Object),
            startEntryTime: expect.any(Object),
            finishedEntryTime: expect.any(Object),
            status: expect.any(Object),
            item: expect.any(Object),
            sourceWarehouse: expect.any(Object),
            team: expect.any(Object),
            warehouse: expect.any(Object),
            activity: expect.any(Object),
          }),
        );
      });
    });

    describe('getWarehouseTransaction', () => {
      it('should return NewWarehouseTransaction for default WarehouseTransaction initial value', () => {
        const formGroup = service.createWarehouseTransactionFormGroup(sampleWithNewData);

        const warehouseTransaction = service.getWarehouseTransaction(formGroup) as any;

        expect(warehouseTransaction).toMatchObject(sampleWithNewData);
      });

      it('should return NewWarehouseTransaction for empty WarehouseTransaction initial value', () => {
        const formGroup = service.createWarehouseTransactionFormGroup();

        const warehouseTransaction = service.getWarehouseTransaction(formGroup) as any;

        expect(warehouseTransaction).toMatchObject({});
      });

      it('should return IWarehouseTransaction', () => {
        const formGroup = service.createWarehouseTransactionFormGroup(sampleWithRequiredData);

        const warehouseTransaction = service.getWarehouseTransaction(formGroup) as any;

        expect(warehouseTransaction).toMatchObject(sampleWithRequiredData);
      });
    });

    describe('resetForm', () => {
      it('passing IWarehouseTransaction should not enable id FormControl', () => {
        const formGroup = service.createWarehouseTransactionFormGroup();
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, sampleWithRequiredData);

        expect(formGroup.controls.id.disabled).toBe(true);
      });

      it('passing NewWarehouseTransaction should disable id FormControl', () => {
        const formGroup = service.createWarehouseTransactionFormGroup(sampleWithRequiredData);
        expect(formGroup.controls.id.disabled).toBe(true);

        service.resetForm(formGroup, { id: null });

        expect(formGroup.controls.id.disabled).toBe(true);
      });
    });
  });
});
