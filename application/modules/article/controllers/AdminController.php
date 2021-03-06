<?php

/**
 * 
 */
class Article_AdminController extends Zend_Controller_Action
{

    /**
     * 
     */
    public function init()
	{

		$chrisContext = $this->_helper->getHelper('ChrisContext');

		$chrisContext	->addActionContext('index', 'jquerymobile')
						->addActionContext('manage', 'jquerymobile')
						->addActionContext('delete', 'jquerymobile')
						->initContext('jquerymobile');
		
		parent::init();
		
	}

    /**
     * 
     */
    public function indexAction()
	{
	
		$articleModel = new Article_Model_MongoDB_Article();
		
		$keys = array('_id', 'title', 'status');
		
		$cursor = $articleModel->getList(array(), $keys);
		
		$sort = array('last_update_date' => -1);
		
		// paginator
		$cacheIdentifier = md5('article_list_title_status');
        $adapter = new Chris_Paginator_Adapter_MongoDB($cursor, $cacheIdentifier, $sort);
        $paginator = new Zend_Paginator($adapter);

        $page = (int) $this->getRequest()->getParam('page', 1);

        $paginator->setCurrentPageNumber($page);
        $paginator->setItemCountPerPage(10);
        $paginator->setPageRange(5);
		
		$this->view->paginator = $paginator;
		
		$this->view->routeName = 'articleadminindex';

    }
	
    /**
     * 
     */
    public function manageAction()
	{

		$id = $this->getRequest()->getParam('id', 0);
		
		$alnumFilter = new Zend_Filter_Alnum();
		
		$filteredId = $alnumFilter->filter($id);
		
		$articleModel = new Article_Model_MongoDB_Article();
		
        $options = null;
		
		$manageArticleForm = new Article_Form_ManageArticle($options);

        if ($this->getRequest()->isPost()) {

            // get unfiltered POST data
            $formData = $this->getRequest()->getPost();
			
			//Zend_Debug::dump($formData);
			//exit;

            if ($manageArticleForm->isValid($formData)) {

                // get form POST values, now with applied filters
                $formData = $manageArticleForm->getValues();

				if ($filteredId) $formData['_id'] = $filteredId;

				// explode tags
				if (array_key_exists('tags', $formData)) {
				
					$formData['tags'] = explode(',', $formData['tags']);
					
					$filter = new Zend_Filter_StringTrim();
					
					$tags = array();

					foreach ($formData['tags'] as $tag) {
					
						$tag = $filter->filter($tag);
						
						$tags[] = array('id' => md5($tag), 'name' => $tag);
					
					}
					
					$formData['tags'] = $tags;
				
				}
                
                // if there is no image don't overwrite the value that is
                //  already in the database
                if (array_key_exists('image', $formData) && is_null($formData['image'])) {
                    
                    unset($formData['image']);
                    
                }
				
				//Zend_Debug::dump($formData);
                //exit;
                
                $response = $articleModel->saveData($formData);

                if ($response) {
				
					$this->_redirect('/article/admin');
					
				} else {
				
					$manageArticleForm->populate($formData);
					$this->view->manageArticleForm = $manageArticleForm;
				
				}

            } else {

                $manageArticleForm->populate($formData);
                $this->view->manageArticleForm = $manageArticleForm;

            }

        } else {

			if ($filteredId) {
			
				$articleData = $articleModel->getById($filteredId);
				
				if (array_key_exists('tags', $articleData)) {
				
					$tags = array();
				
					foreach($articleData['tags'] as $tag) {
					
						$tags[] = $tag['name'];
					
					}
				
					$articleData['tags'] = implode(', ', $tags);
				
				}
				
				//Zend_Debug::dump($articleData);
			
				$manageArticleForm->populate($articleData);
			
			}
		
            $this->view->manageArticleForm = $manageArticleForm;

        }

    }
	
    /**
     * 
     */
	public function deleteAction()
	{
	
		$id = $this->getRequest()->getParam('id', 0);
		
		$alnumFilter = new Zend_Filter_Alnum();
		
		$filteredId = $alnumFilter->filter($id);
		
		$articleModel = new Article_Model_MongoDB_Article();
		
		$keys = array('title');
		
		$article = $articleModel->getById($id, $keys);
		
		//Zend_Debug::dump($article);
		
		$this->view->article = $article;
		
		$options = array();
		
		$deleteArticleForm = new Article_Form_DeleteArticle($options);
        
        $this->view->status = 'success';

        if ($this->getRequest()->isPost()) {

            // get unfiltered POST data
            $formData = $this->getRequest()->getPost();

            if ($deleteArticleForm->isValid($formData)) {
			
				//Zend_Debug::dump($formData);
				//exit;
				
				if (array_key_exists('yes', $formData)) {
				
					$deleted = $articleModel->deleteEntry($id);
                    
                    if (!$deleted) {
                        
                        $this->view->status = 'failed';
                        
                    }
					
				}
				
				$this->_redirect('/article/admin');
			
			}
			
		} else {
		
			$this->view->deleteArticleForm = $deleteArticleForm;
		
		}
	
	}
    
    /**
     * 
     */
    public function commentsAction()
	{
	
		$commentModel = new Article_Model_MongoDB_Comment();
		
		$keys = array();
		
		$cursor = $commentModel->getList(array(), $keys);
		
		$sort = array('publish_date' => 1);
		
		// paginator
		$cacheIdentifier = md5('article_comments_admin');
        $adapter = new Chris_Paginator_Adapter_MongoDB($cursor, $cacheIdentifier, $sort);
        $paginator = new Zend_Paginator($adapter);

        $page = (int) $this->getRequest()->getParam('page', 1);

        $paginator->setCurrentPageNumber($page);
        $paginator->setItemCountPerPage(10);
        $paginator->setPageRange(5);
		
		$this->view->paginator = $paginator;
		
		$this->view->routeName = 'articlecommentadminindex';

    }

}