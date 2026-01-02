"""
Pydantic schemas for API validation.
"""
from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime


class PropertyBase(BaseModel):
    name: str
    description: Optional[str] = None
    address: str
    city: str
    state: str
    zip_code: str
    phone: Optional[str] = None
    email: Optional[str] = None


class PropertyCreate(PropertyBase):
    pass


class PropertyResponse(PropertyBase):
    id: int
    tenant_id: int
    slug: str
    is_active: bool
    created_at: datetime
    
    class Config:
        from_attributes = True


class ReservationBase(BaseModel):
    check_in: date
    check_out: date
    adults: int = 1
    children: int = 0
    notes: Optional[str] = None


class ReservationCreate(ReservationBase):
    property_id: int
    room_type_id: int
    guest_id: int


class ReservationResponse(ReservationBase):
    id: int
    status: str
    total_price: float
    created_at: datetime
    
    class Config:
        from_attributes = True
