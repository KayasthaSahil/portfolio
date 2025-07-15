from fastapi import APIRouter, HTTPException, Depends
from typing import List, Optional
from datetime import datetime
import logging

from models.portfolio import (
    PortfolioData, 
    PortfolioDataCreate, 
    PortfolioDataUpdate,
    ContactSubmission,
    ContactSubmissionCreate
)
from database import get_database

router = APIRouter()
logger = logging.getLogger(__name__)

@router.get("/portfolio", response_model=PortfolioData)
async def get_portfolio_data(db = Depends(get_database)):
    """Get the current portfolio data"""
    try:
        # Get the most recent portfolio data
        portfolio_data = await db.portfolio.find_one({}, sort=[("updatedAt", -1)])
        
        if not portfolio_data:
            raise HTTPException(status_code=404, detail="Portfolio data not found")
        
        return PortfolioData(**portfolio_data)
    except Exception as e:
        logger.error(f"Error fetching portfolio data: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/portfolio", response_model=PortfolioData)
async def create_portfolio_data(portfolio_data: PortfolioDataCreate, db = Depends(get_database)):
    """Create or update portfolio data"""
    try:
        # Create new portfolio data
        new_portfolio = PortfolioData(**portfolio_data.dict())
        
        # Insert into database
        result = await db.portfolio.insert_one(new_portfolio.dict())
        
        if result.inserted_id:
            return new_portfolio
        else:
            raise HTTPException(status_code=500, detail="Failed to create portfolio data")
    except Exception as e:
        logger.error(f"Error creating portfolio data: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.put("/portfolio", response_model=PortfolioData)
async def update_portfolio_data(portfolio_update: PortfolioDataUpdate, db = Depends(get_database)):
    """Update existing portfolio data"""
    try:
        # Get current portfolio data
        current_portfolio = await db.portfolio.find_one({}, sort=[("updatedAt", -1)])
        
        if not current_portfolio:
            raise HTTPException(status_code=404, detail="Portfolio data not found")
        
        # Update fields that are provided
        update_dict = portfolio_update.dict(exclude_unset=True)
        update_dict["updatedAt"] = datetime.utcnow()
        
        # Update the document
        result = await db.portfolio.update_one(
            {"_id": current_portfolio["_id"]},
            {"$set": update_dict}
        )
        
        if result.modified_count > 0:
            # Return updated data
            updated_portfolio = await db.portfolio.find_one({"_id": current_portfolio["_id"]})
            return PortfolioData(**updated_portfolio)
        else:
            raise HTTPException(status_code=500, detail="Failed to update portfolio data")
    except Exception as e:
        logger.error(f"Error updating portfolio data: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.post("/contact", response_model=ContactSubmission)
async def submit_contact_form(contact_data: ContactSubmissionCreate, db = Depends(get_database)):
    """Submit a contact form"""
    try:
        # Create new contact submission
        new_submission = ContactSubmission(**contact_data.dict())
        
        # Insert into database
        result = await db.contact_submissions.insert_one(new_submission.dict())
        
        if result.inserted_id:
            return new_submission
        else:
            raise HTTPException(status_code=500, detail="Failed to submit contact form")
    except Exception as e:
        logger.error(f"Error submitting contact form: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.get("/contact", response_model=List[ContactSubmission])
async def get_contact_submissions(
    status: Optional[str] = None,
    limit: int = 100,
    skip: int = 0,
    db = Depends(get_database)
):
    """Get contact form submissions (admin endpoint)"""
    try:
        # Build query filter
        query_filter = {}
        if status:
            query_filter["status"] = status
        
        # Get submissions
        submissions = await db.contact_submissions.find(query_filter).skip(skip).limit(limit).sort("submittedAt", -1).to_list(limit)
        
        return [ContactSubmission(**submission) for submission in submissions]
    except Exception as e:
        logger.error(f"Error fetching contact submissions: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")

@router.put("/contact/{submission_id}")
async def update_contact_submission_status(
    submission_id: str,
    status: str,
    db = Depends(get_database)
):
    """Update contact submission status"""
    try:
        # Update submission status
        result = await db.contact_submissions.update_one(
            {"id": submission_id},
            {"$set": {"status": status}}
        )
        
        if result.modified_count > 0:
            return {"message": "Status updated successfully"}
        else:
            raise HTTPException(status_code=404, detail="Submission not found")
    except Exception as e:
        logger.error(f"Error updating submission status: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")