import type {Type} from '@angular/core';
import {Component, ViewChild} from '@angular/core';
import type {ComponentFixture} from '@angular/core/testing';
import {TestBed} from '@angular/core/testing';
import {TuiDay} from '@taiga-ui/cdk';
import {TuiRootModule} from '@taiga-ui/core';
import {TuiInputDateMultiComponent, TuiInputDateMultiModule} from '@taiga-ui/kit';

describe('InputDateMultiComponent', () => {
    @Component({
        template: `
            <tui-root>
                <tui-input-date
                    multiple
                    [max]="max"
                    [min]="min"
                >
                    Choose a date
                </tui-input-date>
            </tui-root>
        `,
    })
    class Test {
        @ViewChild(TuiInputDateMultiComponent)
        readonly component!: TuiInputDateMultiComponent;

        min = new TuiDay(2017, 0, 1);

        max = new TuiDay(2018, 0, 1);
    }

    let fixture: ComponentFixture<Test>;
    let testComponent: Test;
    let component: TuiInputDateMultiComponent;

    const meta = {
        imports: [TuiRootModule, TuiInputDateMultiModule],
        declarations: [Test],
    };

    function initializeEnvironment(type: Type<Test> = Test): void {
        fixture = TestBed.createComponent(type);
        fixture.detectChanges();

        testComponent = fixture.componentInstance;
        fixture.detectChanges();

        component = testComponent.component;
        fixture.detectChanges();
    }

    describe('Default', () => {
        beforeEach(async () => {
            TestBed.configureTestingModule(meta);
            await TestBed.compileComponents();
            initializeEnvironment();
        });

        it('extreme dates (which match the min/max) are also valid', () => {
            testComponent.min = new TuiDay(2017, 0, 1);
            testComponent.max = new TuiDay(2018, 0, 1);

            fixture.detectChanges();

            expect(component.tagValidator([testComponent.min].toString())).toBe(true);
            expect(component.tagValidator([testComponent.max].toString())).toBe(true);
        });

        it('dates not in min/max range are invalid', () => {
            testComponent.min = new TuiDay(2017, 0, 1);
            testComponent.max = new TuiDay(2018, 0, 1);

            fixture.detectChanges();

            expect(
                component.tagValidator([testComponent.min.append({day: -1})].toString()),
            ).toBe(false);
            expect(
                component.tagValidator([testComponent.max.append({day: 1})].toString()),
            ).toBe(false);
        });
    });
});
